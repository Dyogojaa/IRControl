using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Conferencia;

public class ConferenciaIrrfRule : IAuditoriaRule
{
    public string Nome => "Conferência IRRF";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var totalIrrf = await context.Holerites
            .Where(x => x.Ano == ano)
            .SumAsync(x => x.Irrf);

        var informe = await context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Ano == ano);

        if (informe is null)
            return itens;

        if (totalIrrf != informe.Irrf)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "CONFERÊNCIA",
                Severidade = AuditoriaSeveridade.Erro,
                Descricao =
                    $"IRRF divergente. Holerites: {totalIrrf:C} | Informe: {informe.Irrf:C}"
            });
        }

        return itens;
    }
}