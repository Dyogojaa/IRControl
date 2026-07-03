using IRControl.Application.Business.Auditoria.Interfaces;
using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;

namespace IRControl.Application.Business.Auditoria.Services;

public class AuditoriaService : IAuditoriaService
{
    private readonly IEnumerable<IAuditoriaRule> _rules;
    private readonly AppDbContext _context;

    public AuditoriaService(
        IEnumerable<IAuditoriaRule> rules,
        AppDbContext context)
    {
        _rules = rules;
        _context = context;
    }

    public async Task<AuditoriaModel> ExecutarAsync(int ano)
    {
        var model = new AuditoriaModel
        {
            Ano = ano
        };

        foreach (var rule in _rules)
        {
            var itens = await rule.ExecutarAsync(
                ano,
                _context);

            model.Itens.AddRange(itens);
        }

        model.TotalErros =
            model.Itens.Count(x =>
                x.Severidade == AuditoriaSeveridade.Erro);

        model.TotalAlertas =
            model.Itens.Count(x =>
                x.Severidade == AuditoriaSeveridade.Alerta);

        model.TotalInformacoes =
            model.Itens.Count(x =>
                x.Severidade == AuditoriaSeveridade.Informacao);

        return model;
    }
}