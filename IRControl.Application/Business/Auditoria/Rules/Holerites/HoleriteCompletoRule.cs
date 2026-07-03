using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Holerites;

public class HoleriteCompletoRule : IAuditoriaRule
{
    public string Nome => "Holerite Existe";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var meses = await context.Holerites
            .Where(x => x.Ano == ano)
            .Select(x => x.Mes)
            .ToListAsync();

        for (int mes = 1; mes <= 12; mes++)
        {
            if (!meses.Contains(mes))
            {
                itens.Add(new AuditoriaItem
                {
                    Categoria = "HOLERITE",
                    Severidade = AuditoriaSeveridade.Erro,
                    Descricao = $"Não existe holerite para o mês {mes}."
                });
            }
        }

        return itens;
    }
}