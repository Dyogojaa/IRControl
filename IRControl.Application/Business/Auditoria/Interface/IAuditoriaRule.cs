using IRControl.Application.Business.Auditoria.Models;
using IRControl.Infrastructure.Persistence;

namespace IRControl.Application.Business.Auditoria.Interfaces;

public interface IAuditoriaRule
{
    string Nome { get; }

    Task<IEnumerable<AuditoriaItem>> ExecutarAsync(
        int ano,
        AppDbContext context);
}