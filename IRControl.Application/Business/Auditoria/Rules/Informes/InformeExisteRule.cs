using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Informes;

public class InformeExisteRule : IAuditoriaRule
{
    public string Nome => "Informe Existe";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var existe = await context.InformesRendimento
            .AnyAsync(x => x.Ano == ano);

        if (!existe)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "INFORME",
                Severidade = AuditoriaSeveridade.Erro,
                Descricao = $"Não existe Informe de Rendimentos cadastrado para o ano {ano}."
            });
        }

        return itens;
    }
}