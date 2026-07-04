using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.DespesasMedicas;

public class DespesaSemCpfRule : IAuditoriaRule
{
    public string Nome => "Despesa sem CPF/CNPJ";

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
            if (string.IsNullOrWhiteSpace(despesa.CpfCnpj))
            {
                itens.Add(new AuditoriaItem
                {
                    Categoria = "DESPESA MÉDICA",
                    Severidade = AuditoriaSeveridade.Alerta,
                    Descricao =
                        $"A despesa médica de '{despesa.Dependente.Nome}' não possui CPF/CNPJ do prestador."
                });
            }
        }

        return itens;
    }
}