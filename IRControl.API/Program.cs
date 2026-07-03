using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Rules.Holerites;
using IRControl.Application.Business.Auditoria.Rules.Informes;
using IRControl.Application.Business.Auditoria.Services;
using IRControl.Application.Business.Declaracao.Interfaces;
using IRControl.Application.Business.Declaracao.Services;
using IRControl.Application.Interfaces;
using IRControl.Application.Services;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IHoleriteService, HoleriteService>();
builder.Services.AddScoped<IDependenteService, DependenteService>();
builder.Services.AddScoped<IDespesaMedicaService, DespesaMedicaService>();
builder.Services.AddScoped<IInformeRendimentoService, InformeRendimentoService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ISituacaoDeclaracaoService,SituacaoDeclaracaoService>();

builder.Services.AddScoped<IAuditoriaService, AuditoriaService>();

#region Holetite Rules
builder.Services.AddScoped<IAuditoriaRule, HoleriteCompletoRule>();
builder.Services.AddScoped<IAuditoriaRule, HoleriteDuplicadoRule>();
builder.Services.AddScoped<IAuditoriaRule, HoleriteValorNegativoRule>();
builder.Services.AddScoped<IAuditoriaRule, HoleriteSalarioZeroRule>();
builder.Services.AddScoped<IAuditoriaRule, MesInvalidoRule>();
#endregion
#region informe Rules

builder.Services.AddScoped<IAuditoriaRule, InformeExisteRule>();
builder.Services.AddScoped<IAuditoriaRule, InformeDuplicadoRule>();

#endregion 


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
