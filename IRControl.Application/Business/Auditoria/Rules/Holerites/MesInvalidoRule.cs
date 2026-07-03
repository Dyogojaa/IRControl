using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Holerites;

public class MesInvalidoRule : IAuditoriaRule
{
    public string Nome => "Mês Inválido";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var invalidos = await context.Holerites
            .Where(x => x.Ano == ano &&
                        (x.Mes < 1 || x.Mes > 12))
            .ToListAsync();

        foreach (var h in invalidos)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "HOLERITE",
                Severidade = AuditoriaSeveridade.Erro,
                Descricao = $"Mês inválido ({h.Mes}) encontrado."
            });
        }

        return itens;
    }
}