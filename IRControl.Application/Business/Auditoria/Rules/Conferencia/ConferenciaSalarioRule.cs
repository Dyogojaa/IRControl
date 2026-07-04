using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Conferencia;

public class ConferenciaSalarioRule : IAuditoriaRule
{
    public string Nome => "Conferência Salário Bruto";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var totalHolerites = await context.Holerites
            .Where(x => x.Ano == ano)
            .SumAsync(x => x.SalarioBruto);

        var informe = await context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Ano == ano);

        if (informe is null)
            return itens;

        if (totalHolerites != informe.SalarioBruto)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "CONFERÊNCIA",
                Severidade = AuditoriaSeveridade.Erro,
                Descricao =
                    $"Salário Bruto divergente. Holerites: {totalHolerites:C} | Informe: {informe.SalarioBruto:C}"
            });
        }

        return itens;
    }
}