using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;
using IRControl.Domain.Entities;

namespace IRControl.Application.Interfaces;

public interface IDespesaMedicaService
{
    Task<IEnumerable<DespesaMedicaResponse>> ObterTodosAsync(
        ListarDespesasMedicasRequest request);

    Task<DespesaMedicaResponse?> ObterPorIdAsync(int id);

    Task<DespesaMedicaResponse> CriarAsync(
        CreateDespesaMedicaRequest request);

    Task<DespesaMedicaResponse?> AtualizarAsync(
        int id,
        UpdateDespesaMedicaRequest request);

    Task<bool> ExcluirAsync(int id);
}