using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;

namespace IRControl.Application.Interfaces
{
    public interface IHoleriteService
    {
        Task<IEnumerable<HoleriteResponse>> ObterTodosAsync( ListarHoleritesRequest request);

        Task<HoleriteResponse?> ObterPorIdAsync(int id);

        Task<HoleriteResponse> CriarAsync(
            CreateHoleriteRequest request);

        Task<bool> ExcluirAsync(int id);

        Task<HoleriteResponse?> AtualizarAsync(int id, CreateHoleriteRequest request);
    }
}
