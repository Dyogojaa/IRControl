using IRControl.Application.Business.Dashboard.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(
        IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    /// <summary>
    /// Retorna o Dashboard do ano informado.
    /// </summary>
    [HttpGet("{ano:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Obter(int ano)
    {
        if (ano < 1900 || ano > DateTime.Now.Year + 1)
            return BadRequest("Ano inválido.");

        var dashboard =
            await _dashboardService.ObterDashboardAsync(ano);

        return Ok(dashboard);
    }
}