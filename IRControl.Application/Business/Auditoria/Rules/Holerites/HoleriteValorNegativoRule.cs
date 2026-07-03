using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Auditoria.Rules.Holerites;

public class HoleriteValorNegativoRule : IAuditoriaRule
{
    public string Nome => "Valores Negativos";

    public async Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context)
    {
        var itens = new List<AuditoriaItem>();

        var holerites = await context.Holerites
            .Where(x => x.Ano == ano)
            .ToListAsync();

        foreach (var h in holerites)
        {
            if (h.SalarioBruto < 0 ||
                h.Inss < 0 ||
                h.Irrf < 0 ||
                h.SalarioLiquido < 0 ||
                (h.PlanoSaude ?? 0) < 0 ||
                (h.PrevidenciaPrivada ?? 0) < 0 ||
                (h.OutrosDescontos ?? 0) < 0)
            {
                itens.Add(new AuditoriaItem
                {
                    Categoria = "HOLERITE",
                    Severidade = AuditoriaSeveridade.Erro,
                    Descricao = $"Valores negativos encontrados no holerite do mês {h.Mes}."
                });
            }
        }

        return itens;
    }
}