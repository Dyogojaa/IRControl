namespace IRControl.Application.Business.Auditoria.Interfaces;

using IRControl.Application.Business.Auditoria.Models;

public interface IAuditoriaService
{
    Task<AuditoriaModel> ExecutarAsync(int ano);
}