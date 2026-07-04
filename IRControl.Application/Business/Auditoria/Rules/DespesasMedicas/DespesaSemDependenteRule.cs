using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.DespesasMedicas;

public class DespesaSemDependenteRule : IAuditoriaRule
{
    public string Nome => "Despesa sem Dependente";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var despesas = await context.DespesasMedicas
            .Where(x => x.DataDespesa.Year == ano)
            .ToListAsync();

        foreach (var despesa in despesas)
        {
            var existe = await context.Dependentes
                .AnyAsync(x => x.Id == despesa.DependenteId);

            if (!existe)
            {
                itens.Add(new AuditoriaItem
                {
                    Categoria = "DESPESA MÉDICA",
                    Severidade = AuditoriaSeveridade.Erro,
                    Descricao =
                        $"Existe uma despesa médica vinculada ao DependenteId {despesa.DependenteId}, porém o dependente não foi encontrado."
                });
            }
        }

        return itens;
    }
}