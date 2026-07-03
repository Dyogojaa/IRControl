using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Informes;

public class InformeDuplicadoRule : IAuditoriaRule
{
    public string Nome => "Informe Duplicado";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var quantidade = await context.InformesRendimento
            .CountAsync(x => x.Ano == ano);

        if (quantidade > 1)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "INFORME",
                Severidade = AuditoriaSeveridade.Erro,
                Descricao = $"Existem {quantidade} Informes de Rendimentos cadastrados para o ano {ano}."
            });
        }

        return itens;
    }
}