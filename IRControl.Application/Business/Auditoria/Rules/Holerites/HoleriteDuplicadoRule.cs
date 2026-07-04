using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Application.Common.Constants;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Holerites;

public class HoleriteDuplicadoRule : IAuditoriaRule
{
    public string Nome => "Holerite Duplicado";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        // Carrega os holerites do ano
        var holerites = await context.Holerites
            .Where(x => x.Ano == ano)
            .ToListAsync();

        // Agrupa em memória
        var duplicados = holerites
            .GroupBy(x => x.Mes)
            .Where(g => g.Count() > 1);

        foreach (var grupo in duplicados)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = AuditoriaCategorias.Holerite,
                Severidade = AuditoriaSeveridade.Erro,
                Descricao = $"Existem {grupo.Count()} holerites cadastrados para o mês {grupo.Key}."
            });
        }

        return itens;
    }
}