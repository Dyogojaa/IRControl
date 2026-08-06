using IRControl.Application.DTOs.Requests;
using IRControl.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class HoleriteController : ControllerBase
{
    private readonly IHoleriteService _service;

    public HoleriteController(IHoleriteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get(
     [FromQuery] ListarHoleritesRequest request)
    {
        var resultado =
            await _service.ObterTodosAsync(request);

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
        [FromBody] CreateHoleriteRequest request)
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
        [FromBody] CreateHoleriteRequest request)
    {
        var resultado = await _service.AtualizarAsync(id, request);

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
}