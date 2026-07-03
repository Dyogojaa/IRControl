using IRControl.Application.Business.Declaracao.Interfaces;
using IRControl.Application.Business.Declaracao.Models;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Declaracao.Services;

public class SituacaoDeclaracaoService : ISituacaoDeclaracaoService
{
    private readonly AppDbContext _context;

    public SituacaoDeclaracaoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<SituacaoDeclaracaoModel> ObterSituacaoAsync(int ano)
    {
        var model = new SituacaoDeclaracaoModel
        {
            Ano = ano
        };

        // Holerites
        var holerites = await _context.Holerites
            .Where(x => x.Ano == ano)
            .ToListAsync();

        model.HoleritesEncontrados = holerites.Count;

        if (model.HoleritesEncontrados < model.HoleritesEsperados)
        {
            model.Pendencias.Add(
                $"Existem apenas {model.HoleritesEncontrados} holerites cadastrados.");
        }

        // Informe
        var informe = await _context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Ano == ano);

        model.InformeEncontrado = informe != null;

        if (informe == null)
        {
            model.Pendencias.Add(
                "Informe de Rendimentos não cadastrado.");
        }

        // Dependentes
        model.TotalDependentes =
            await _context.Dependentes.CountAsync();

        // Despesas Médicas
        var despesas = await _context.DespesasMedicas
            .Where(x => x.DataDespesa.Year == ano)
            .ToListAsync();

        model.TotalDespesasMedicas = despesas.Count;

        model.ValorTotalDespesas =
            despesas.Sum(x => x.Valor);

        model.ValorTotalDedutivel =
            despesas.Sum(x => x.Valor - x.ValorReembolsado);

        // Conferência
        if (informe != null)
        {
            var salario = holerites.Sum(x => x.SalarioBruto);
            var inss = holerites.Sum(x => x.Inss);
            var irrf = holerites.Sum(x => x.Irrf);

            bool conferencia =
                salario == informe.SalarioBruto &&
                inss == informe.Inss &&
                irrf == informe.Irrf;

            model.ConferenciaOk = conferencia;

            if (!conferencia)
            {
                model.Pendencias.Add(
                    "Existem divergências entre Holerites e Informe de Rendimentos.");
            }
        }

        model.DeclaracaoPronta =
            !model.Pendencias.Any();

        return model;
    }
}