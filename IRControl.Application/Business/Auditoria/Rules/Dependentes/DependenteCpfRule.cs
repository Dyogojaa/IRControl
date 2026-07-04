using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Dependentes;

public class DependenteCpfRule : IAuditoriaRule
{
    public string Nome => "Dependente CPF";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var dependentes = await context.Dependentes.ToListAsync();

        foreach (var dependente in dependentes)
        {
            if (string.IsNullOrWhiteSpace(dependente.Cpf))
            {
                itens.Add(new AuditoriaItem
                {
                    Categoria = "DEPENDENTE",
                    Severidade = AuditoriaSeveridade.Erro,
                    Descricao = $"O dependente '{dependente.Nome}' não possui CPF informado."
                });

                continue;
            }

            var cpf = dependente.Cpf
                .Replace(".", "")
                .Replace("-", "")
                .Trim();

            if (cpf.Length != 11)
            {
                itens.Add(new AuditoriaItem
                {
                    Categoria = "DEPENDENTE",
                    Severidade = AuditoriaSeveridade.Erro,
                    Descricao = $"O CPF do dependente '{dependente.Nome}' é inválido."
                });
            }
        }

        return itens;
    }
}