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

#region Demais Dependencies
builder.Services.AddScoped<IHoleriteService, HoleriteService>();
builder.Services.AddScoped<IDependenteService, DependenteService>();
builder.Services.AddScoped<IDespesaMedicaService, DespesaMedicaService>();
builder.Services.AddScoped<IInformeRendimentoService, InformeRendimentoService>();
builder.Services.AddScoped<ISituacaoDeclaracaoService,SituacaoDeclaracaoService>();
builder.Services.AddScoped<IAuditoriaService, AuditoriaService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

#endregion

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
#region Conferencia Rules   

builder.Services.AddScoped<IAuditoriaRule, ConferenciaSalarioRule>();
builder.Services.AddScoped<IAuditoriaRule, ConferenciaInssRule>();
builder.Services.AddScoped<IAuditoriaRule, ConferenciaIrrfRule>();

#endregion
#region Despesas Médicas Rules

builder.Services.AddScoped<IAuditoriaRule, DespesaSemCpfRule>();
builder.Services.AddScoped<IAuditoriaRule, ReembolsoMaiorQueDespesaRule>();
builder.Services.AddScoped<IAuditoriaRule, DespesaSemDependenteRule>();
#endregion
#region Dependentes Rules
builder.Services.AddScoped<IAuditoriaRule, DependenteCpfRule>();
builder.Services.AddScoped<IAuditoriaRule, DependenteDuplicadoRule>();
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
