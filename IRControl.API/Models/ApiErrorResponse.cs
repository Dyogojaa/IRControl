namespace IRControl.API.Models;

public class ApiErrorResponse
{
    public bool Success => false;

    public int StatusCode { get; set; }

    public string Message { get; set; } = string.Empty;

    public string? Detail { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.Now;

    public string TraceId { get; set; } = string.Empty;
}