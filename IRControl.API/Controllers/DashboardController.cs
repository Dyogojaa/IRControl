using IRControl.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _service;

    public DashboardController(
        IDashboardService service)
    {
        _service = service;
    }

    [HttpGet("{ano:int}")]
    public async Task<IActionResult> Get(int ano)
    {
        var resultado = await _service.ObterAsync(ano);

        return Ok(resultado);
    }
}