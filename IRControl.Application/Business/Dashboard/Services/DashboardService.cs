using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Dashboard.Interfaces;
using IRControl.Application.Business.Dashboard.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Dashboard.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;
    private readonly IAuditoriaService _auditoriaService;

    public DashboardService(
        AppDbContext context,
        IAuditoriaService auditoriaService)
    {
        _context = context;
        _auditoriaService = auditoriaService;
    }

    public async Task<DashboardModel> ObterDashboardAsync(int ano)
    {
        var model = new DashboardModel
        {
            Ano = ano,
            UltimaAtualizacao = DateTime.Now
        };

        #region Holerites

        var holerites = await _context.Holerites
            .Where(x => x.Ano == ano)
            .ToListAsync();

        model.Holerites.Esperados = 12;
        model.Holerites.Cadastrados = holerites.Count;

        model.Holerites.SalarioBruto =
            holerites.Sum(x => x.SalarioBruto);

        model.Holerites.Inss =
            holerites.Sum(x => x.Inss);

        model.Holerites.Irrf =
            holerites.Sum(x => x.Irrf);

        model.Holerites.PlanoSaude =
            holerites.Sum(x => x.PlanoSaude ?? 0);

        model.Holerites.PrevidenciaPrivada =
            holerites.Sum(x => x.PrevidenciaPrivada ?? 0);

        #endregion

        #region Informe

        var informe = await _context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Ano == ano);

        model.Informe.Cadastrado = informe != null;

        if (informe != null)
        {
            model.Informe.Empresa =
                string.IsNullOrWhiteSpace(informe.Empresa)
                    ? "Não informado"
                    : informe.Empresa;

            model.Informe.SalarioBruto =
                informe.SalarioBruto;

            model.Informe.Inss =
                informe.Inss;

            model.Informe.Irrf =
                informe.Irrf;
        }

        #endregion

        #region Dependentes

        var dependentes = await _context.Dependentes
            .ToListAsync();

        model.Dependentes.Quantidade =
            dependentes.Count;

        model.Dependentes.ComCpf =
            dependentes.Count(x =>
                !string.IsNullOrWhiteSpace(x.Cpf));

        model.Dependentes.SemCpf =
            dependentes.Count(x =>
                string.IsNullOrWhiteSpace(x.Cpf));

        #endregion

        #region Despesas Médicas

        var despesas = await _context.DespesasMedicas
            .Where(x => x.DataDespesa.Year == ano)
            .ToListAsync();

        model.DespesasMedicas.Quantidade =
            despesas.Count;

        model.DespesasMedicas.ValorTotal =
            despesas.Sum(x => x.Valor);

        model.DespesasMedicas.ValorReembolsado =
            despesas.Sum(x => x.ValorReembolsado);

        model.DespesasMedicas.ValorDedutivel =
            despesas.Sum(x => x.ValorDedutivel);

        #endregion

        #region Auditoria

        var auditoria =
            await _auditoriaService.ExecutarAsync(ano);

        model.Auditoria.TotalErros =
            auditoria.TotalErros;

        model.Auditoria.TotalAlertas =
            auditoria.TotalAlertas;

        model.Auditoria.TotalInformacoes =
            auditoria.TotalInformacoes;

        model.Auditoria.DeclaracaoApta =
            auditoria.DeclaracaoApta;

        #endregion

        #region Status

        model.Status = auditoria.DeclaracaoApta
            ? "PRONTO PARA DECLARAR"
            : "PENDENTE";

        #endregion

        return model;
    }
}