using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Conferencia;

public class ConferenciaInssRule : IAuditoriaRule
{
    public string Nome => "Conferência INSS";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var totalInss = await context.Holerites
            .Where(x => x.Ano == ano)
            .SumAsync(x => x.Inss);

        var informe = await context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Ano == ano);

        if (informe is null)
            return itens;

        if (totalInss != informe.Inss)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "CONFERÊNCIA",
                Severidade = AuditoriaSeveridade.Erro,
                Descricao =
                    $"INSS divergente. Holerites: {totalInss:C} | Informe: {informe.Inss:C}"
            });
        }

        return itens;
    }
}