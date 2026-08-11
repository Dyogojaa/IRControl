using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;

namespace IRControl.Application.Interfaces;

public interface IInformeRendimentoService
{
    Task<IEnumerable<InformeRendimentoResponse>> ObterTodosAsync(
        ListaInformesRequest request);

    Task<InformeRendimentoResponse?> ObterPorIdAsync(int id);

    Task<InformeRendimentoResponse> CriarAsync(
        CreateInformeRendimentoRequest request);

    Task<InformeRendimentoResponse?> AtualizarAsync(
        int id,
        CreateInformeRendimentoRequest request);

    Task<bool> ExcluirAsync(int id);

    Task<ConferenciaIrResponse?> ConferenciaAsync(int ano);
}