using System.Text.Json;
using IRControl.API.Models;

namespace IRControl.API.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        IWebHostEnvironment environment,
        ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _environment = environment;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception,
                "Erro não tratado durante o processamento da requisição.");

            await HandleExceptionAsync(context, exception);
        }
    }

    private async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = new ApiErrorResponse
        {
            StatusCode = context.Response.StatusCode,
            Message = "Ocorreu um erro interno na aplicação.",
            TraceId = context.TraceIdentifier,
            Timestamp = DateTime.Now
        };

        if (_environment.IsDevelopment())
        {
            response.Detail = exception.Message;
        }

        var json = JsonSerializer.Serialize(
            response,
            new JsonSerializerOptions
            {
                WriteIndented = true
            });

        await context.Response.WriteAsync(json);
    }
}