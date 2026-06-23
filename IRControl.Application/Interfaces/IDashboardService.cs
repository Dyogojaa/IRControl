using IRControl.Application.DTOs.Responses;

namespace IRControl.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardResponse> ObterAsync(int ano);
}