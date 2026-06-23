using IRControl.Application.DTOs.Responses;
using IRControl.Application.Interfaces;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardResponse> ObterAsync(int ano)
    {
        var holerites = await _context.Holerites
            .Where(x => x.Ano == ano)
            .ToListAsync();

        var despesas = await _context.DespesasMedicas
            .Where(x => x.DataDespesa.Year == ano)
            .ToListAsync();

        var informe = await _context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Ano == ano);

        var totalSalario = holerites.Sum(x => x.SalarioBruto);
        var totalInss = holerites.Sum(x => x.Inss);
        var totalIrrf = holerites.Sum(x => x.Irrf);

        bool possuiDivergencia = false;

        if (informe != null)
        {
            possuiDivergencia =
                totalSalario != informe.SalarioBruto ||
                totalInss != informe.Inss ||
                totalIrrf != informe.Irrf;
        }

        return new DashboardResponse
        {
            Ano = ano,

            QuantidadeHolerites = holerites.Count,

            QuantidadeDependentes =
                await _context.Dependentes.CountAsync(),

            QuantidadeDespesasMedicas =
                despesas.Count,

            TotalSalarioBruto =
                totalSalario,

            TotalInss =
                totalInss,

            TotalIrrf =
                totalIrrf,

            TotalPlanoSaude =
                holerites.Sum(x => x.PlanoSaude ?? 0),

            TotalDespesasMedicas =
                despesas.Sum(x => x.Valor),

            TotalReembolsado =
                despesas.Sum(x => x.ValorReembolsado),

            TotalDedutivel =
                despesas.Sum(x => x.Valor - x.ValorReembolsado),

            PossuiInformeRendimento =
                informe != null,

            PossuiDivergencias =
                possuiDivergencia
        };
    }
}