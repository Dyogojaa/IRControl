
using IRControl.Application.Business.Atividades.DTOs;
using IRControl.Application.Business.Atividades.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AtividadesController : ControllerBase
{
    private readonly IAtividadeService _atividadeService;

    public AtividadesController(IAtividadeService atividadeService)
    {
        _atividadeService = atividadeService;
    }

    /// <summary>
    /// Retorna as atividades mais recentes do sistema.
    /// </summary>
    /// <param name="quantidade">
    /// Quantidade de registros retornados. Padrão: 10.
    /// </param>
    [HttpGet]    
    [ProducesResponseType(typeof(List<AtividadeResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<AtividadeResponse>>> Get(
        [FromQuery] int quantidade = 3)
    {
        var atividades = await _atividadeService.ObterRecentesAsync(quantidade);

        return Ok(atividades);
    }
}