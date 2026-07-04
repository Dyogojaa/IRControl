using IRControl.Application.Business.Dashboard.Models;

namespace IRControl.Application.Business.Dashboard.Interfaces;

public interface IDashboardService
{
    Task<DashboardModel> ObterDashboardAsync(int ano);
}