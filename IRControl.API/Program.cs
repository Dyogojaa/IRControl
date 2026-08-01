using IRControl.API.Extensions;
using IRControl.Application.Atividades.Mappings;
using IRControl.Application.Atividades.Services;
using IRControl.Application.Business.Atividades.Interface;
using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Rules.Conferencia;
using IRControl.Application.Business.Auditoria.Rules.Dependentes;
using IRControl.Application.Business.Auditoria.Rules.DespesasMedicas;
using IRControl.Application.Business.Auditoria.Rules.Holerites;
using IRControl.Application.Business.Auditoria.Rules.Informes;
using IRControl.Application.Business.Auditoria.Services;
using IRControl.Application.Business.Authentication.Interfaces;
using IRControl.Application.Business.Authentication.Services;
using IRControl.Application.Business.Dashboard.Interfaces;
using IRControl.Application.Business.Dashboard.Services;
using IRControl.Application.Business.Declaracao.Interfaces;
using IRControl.Application.Business.Declaracao.Services;
using IRControl.Application.Interfaces;
using IRControl.Application.Services;
using IRControl.Infrastructure.Authentication.Interface;
using IRControl.Infrastructure.Authentication.Models;
using IRControl.Infrastructure.Authentication.Security;
using IRControl.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;
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

#region Servicos JWT    
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection(JwtSettings.SectionName));


builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();


builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwt = builder.Configuration
            .GetSection(JwtSettings.SectionName)
            .Get<JwtSettings>()!;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwt.Key))
        };
    });

builder.Services.AddAuthorization();
#endregion


builder.Services.AddScoped<IAtividadeService, AtividadeService>();

builder.Services.AddAutoMapper(
    cfg => { },
    typeof(AtividadeProfile).Assembly
);


#region Swagger

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IUserContext, UserContext>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "IRControl API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Informe apenas o token JWT."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
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
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

#endregion