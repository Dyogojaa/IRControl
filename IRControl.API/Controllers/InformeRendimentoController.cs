using IRControl.Application.DTOs.Requests;
using IRControl.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InformeRendimentoController : ControllerBase
{
    private readonly IInformeRendimentoService _service;

    public InformeRendimentoController(
        IInformeRendimentoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var resultado = await _service.ObterTodosAsync();

        return Ok(resultado);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var resultado = await _service.ObterPorIdAsync(id);

        if (resultado is null)
            return NotFound();

        return Ok(resultado);
    }

    [HttpPost]
    public async Task<IActionResult> Post(
        [FromBody] CreateInformeRendimentoRequest request)
    {
        var resultado = await _service.CriarAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = resultado.Id },
            resultado);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(
        int id,
        [FromBody] CreateInformeRendimentoRequest request)
    {
        var resultado = await _service.AtualizarAsync(
            id,
            request);

        if (resultado is null)
            return NotFound();

        return Ok(resultado);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var removido = await _service.ExcluirAsync(id);

        if (!removido)
            return NotFound();

        return NoContent();
    }

    [HttpGet("conferencia/{ano:int}")]
    public async Task<IActionResult> Conferencia(int ano)
    {
        var resultado = await _service.ConferenciaAsync(ano);

        if (resultado is null)
            return NotFound(
                $"Informe de rendimento não encontrado para o ano {ano}.");

        return Ok(resultado);
    }
}