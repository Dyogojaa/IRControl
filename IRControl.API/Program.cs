using IRControl.API.Extensions;
using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Rules.Conferencia;
using IRControl.Application.Business.Auditoria.Rules.Dependentes;
using IRControl.Application.Business.Auditoria.Rules.DespesasMedicas;
using IRControl.Application.Business.Auditoria.Rules.Holerites;
using IRControl.Application.Business.Auditoria.Rules.Informes;
using IRControl.Application.Business.Auditoria.Services;
using IRControl.Application.Business.Dashboard.Interfaces;
using IRControl.Application.Business.Dashboard.Services;
using IRControl.Application.Business.Declaracao.Interfaces;
using IRControl.Application.Business.Declaracao.Services;
using IRControl.Application.Interfaces;
using IRControl.Application.Services;
using IRControl.Infrastructure.Persistence;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

#region CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

#endregion

#region Controllers

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
    });

#endregion

#region Swagger

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "IRControl API",
        Version = "v1",
        Description = "API para gerenciamento e auditoria do Imposto de Renda."
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

    options.IncludeXmlComments(xmlPath);
});

#endregion

#region Database

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>("SQL Server");

#endregion

#region Application Services

builder.Services.AddScoped<IHoleriteService, HoleriteService>();
builder.Services.AddScoped<IDependenteService, DependenteService>();
builder.Services.AddScoped<IDespesaMedicaService, DespesaMedicaService>();
builder.Services.AddScoped<IInformeRendimentoService, InformeRendimentoService>();

builder.Services.AddScoped<ISituacaoDeclaracaoService, SituacaoDeclaracaoService>();
builder.Services.AddScoped<IAuditoriaService, AuditoriaService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

#endregion

#region Auditoria Rules

// Holerites
builder.Services.AddScoped<IAuditoriaRule, HoleriteCompletoRule>();
builder.Services.AddScoped<IAuditoriaRule, HoleriteDuplicadoRule>();
builder.Services.AddScoped<IAuditoriaRule, HoleriteValorNegativoRule>();
builder.Services.AddScoped<IAuditoriaRule, HoleriteSalarioZeroRule>();
builder.Services.AddScoped<IAuditoriaRule, MesInvalidoRule>();

// Informes
builder.Services.AddScoped<IAuditoriaRule, InformeExisteRule>();
builder.Services.AddScoped<IAuditoriaRule, InformeDuplicadoRule>();

// Conferência
builder.Services.AddScoped<IAuditoriaRule, ConferenciaSalarioRule>();
builder.Services.AddScoped<IAuditoriaRule, ConferenciaInssRule>();
builder.Services.AddScoped<IAuditoriaRule, ConferenciaIrrfRule>();

// Despesas Médicas
builder.Services.AddScoped<IAuditoriaRule, DespesaSemCpfRule>();
builder.Services.AddScoped<IAuditoriaRule, ReembolsoMaiorQueDespesaRule>();
builder.Services.AddScoped<IAuditoriaRule, DespesaSemDependenteRule>();

// Dependentes
builder.Services.AddScoped<IAuditoriaRule, DependenteCpfRule>();
builder.Services.AddScoped<IAuditoriaRule, DependenteDuplicadoRule>();

#endregion

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();

    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    await SeedData.InitializeAsync(context);
}

#region Pipeline

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ReactPolicy");
app.UseGlobalExceptionHandler();
app.UseAuthorization();
app.MapControllers();
app.Run();

#endregion