using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.DespesasMedicas;

public class ReembolsoMaiorQueDespesaRule : IAuditoriaRule
{
    public string Nome => "Reembolso Maior que a Despesa";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var despesas = await context.DespesasMedicas
            .Include(x => x.Dependente)
            .Where(x => x.DataDespesa.Year == ano)
            .ToListAsync();

        foreach (var despesa in despesas)
        {
            if (despesa.ValorReembolsado > despesa.Valor)
            {
                itens.Add(new AuditoriaItem
                {
                    Categoria = "DESPESA MÉDICA",
                    Severidade = AuditoriaSeveridade.Erro,
                    Descricao =
                        $"O reembolso da despesa médica de '{despesa.Dependente.Nome}' é maior que o valor da despesa."
                });
            }
        }

        return itens;
    }
}