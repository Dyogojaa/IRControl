using IRControl.Application.Business.Declaracao.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DeclaracaoController : ControllerBase
{
    private readonly ISituacaoDeclaracaoService _situacaoService;

    public DeclaracaoController(
        ISituacaoDeclaracaoService situacaoService)
    {
        _situacaoService = situacaoService;
    }

    /// <summary>
    /// Retorna a situação geral da declaração do ano informado.
    /// </summary>
    [HttpGet("situacao/{ano:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Situacao(int ano)
    {
        if (ano < 1900 || ano > DateTime.Now.Year + 1)
            return BadRequest("Ano inválido.");

        var resultado =
            await _situacaoService.ObterSituacaoAsync(ano);

        return Ok(resultado);
    }

    /// <summary>
    /// Retorna apenas as pendências da declaração.
    /// </summary>
    [HttpGet("pendencias/{ano:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Pendencias(int ano)
    {
        var resultado =
            await _situacaoService.ObterSituacaoAsync(ano);

        return Ok(resultado.Pendencias);
    }

    /// <summary>
    /// Informa se a declaração está pronta para envio.
    /// </summary>
    [HttpGet("status/{ano:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Status(int ano)
    {
        var resultado =
            await _situacaoService.ObterSituacaoAsync(ano);

        return Ok(new
        {
            resultado.Ano,
            resultado.DeclaracaoPronta,
            QuantidadePendencias = resultado.Pendencias.Count
        });
    }

    /// <summary>
    /// Retorna um resumo dos indicadores da declaração.
    /// </summary>
    [HttpGet("resumo/{ano:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Resumo(int ano)
    {
        var resultado =
            await _situacaoService.ObterSituacaoAsync(ano);

        return Ok(new
        {
            resultado.Ano,
            resultado.HoleritesEncontrados,
            resultado.HoleritesEsperados,
            resultado.InformeEncontrado,
            resultado.ConferenciaOk,
            resultado.TotalDependentes,
            resultado.TotalDespesasMedicas,
            resultado.ValorTotalDespesas,
            resultado.ValorTotalDedutivel
        });
    }
}