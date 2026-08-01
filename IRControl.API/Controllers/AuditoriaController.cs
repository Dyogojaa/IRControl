using IRControl.Application.Business.Auditoria.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AuditoriaController : ControllerBase
{
    private readonly IAuditoriaService _auditoriaService;

    public AuditoriaController(
        IAuditoriaService auditoriaService)
    {
        _auditoriaService = auditoriaService;
    }

    /// <summary>
    /// Executa todas as regras de auditoria para o ano informado.
    /// </summary>
    /// <param name="ano">Ano base da declaração.</param>
    [HttpGet("{ano:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Auditoria(int ano)
    {
        if (ano < 1900 || ano > DateTime.Now.Year + 1)
            return BadRequest("Ano informado é inválido.");

        var resultado = await _auditoriaService.ExecutarAsync(ano);

        return Ok(resultado);
    }

    /// <summary>
    /// Retorna apenas os erros encontrados.
    /// </summary>
    [HttpGet("{ano:int}/erros")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Erros(int ano)
    {
        var resultado = await _auditoriaService.ExecutarAsync(ano);

        return Ok(resultado.Itens.Where(x =>
            x.Severidade == Application.Business.Auditoria.Models.AuditoriaSeveridade.Erro));
    }

    /// <summary>
    /// Retorna apenas os alertas encontrados.
    /// </summary>
    [HttpGet("{ano:int}/alertas")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Alertas(int ano)
    {
        var resultado = await _auditoriaService.ExecutarAsync(ano);

        return Ok(resultado.Itens.Where(x =>
            x.Severidade == Application.Business.Auditoria.Models.AuditoriaSeveridade.Alerta));
    }

    /// <summary>
    /// Retorna um resumo da auditoria.
    /// </summary>
    [HttpGet("{ano:int}/resumo")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Resumo(int ano)
    {
        var resultado = await _auditoriaService.ExecutarAsync(ano);

        return Ok(new
        {
            resultado.Ano,
            resultado.DeclaracaoApta,
            resultado.TotalErros,
            resultado.TotalAlertas,
            resultado.TotalInformacoes
        });
    }
}