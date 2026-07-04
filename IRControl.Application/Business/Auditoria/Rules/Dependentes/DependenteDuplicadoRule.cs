using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Dependentes;

public class DependenteDuplicadoRule : IAuditoriaRule
{
    public string Nome => "Dependente Duplicado";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var dependentes = await context.Dependentes.ToListAsync();

        var duplicados = dependentes
            .Where(x => !string.IsNullOrWhiteSpace(x.Cpf))
            .GroupBy(x => x.Cpf.Replace(".", "").Replace("-", "").Trim())
            .Where(g => g.Count() > 1);

        foreach (var grupo in duplicados)
        {
            itens.Add(new AuditoriaItem
            {
                Categoria = "DEPENDENTE",
                Severidade = AuditoriaSeveridade.Erro,
                Descricao = $"Existem {grupo.Count()} dependentes cadastrados com o CPF {grupo.Key}."
            });
        }

        return itens;
    }
}