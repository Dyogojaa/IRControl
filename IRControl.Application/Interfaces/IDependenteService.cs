using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;

namespace IRControl.Application.Interfaces;

public interface IDependenteService
{
    Task<IEnumerable<DependenteResponse>> ObterTodosAsync(
        ListarDependentesRequest request);

    Task<DependenteResponse?> ObterPorIdAsync(int id);

    Task<DependenteResponse> CriarAsync(
        CreateDependenteRequest request);

    Task<DependenteResponse?> AtualizarAsync(
        int id,
        UpdateDependenteRequest request);

    Task<bool> ExcluirAsync(int id);
}