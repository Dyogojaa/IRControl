using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Holerites;

public class HoleriteSalarioZeroRule : IAuditoriaRule
{
    public string Nome => "Salário Zerado";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var holerites = await context.Holerites
            .Where(x => x.Ano == ano && x.SalarioBruto == 0)
            .ToListAsync();

        foreach (var h in holerites)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "HOLERITE",
                Severidade = AuditoriaSeveridade.Alerta,
                Descricao = $"Salário bruto zerado no mês {h.Mes}."
            });
        }

        return itens;
    }
}