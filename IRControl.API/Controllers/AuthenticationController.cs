using IRControl.Application.Business.Authentication.DTOs;
using IRControl.Application.Business.Authentication.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(
        IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Realiza o login do usuário.
    /// </summary>
    [AllowAnonymous]
    [HttpPost("login")]
    [ProducesResponseType(
        typeof(LoginResponse),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        typeof(LoginResponse),
        StatusCodes.Status400BadRequest)]
    [ProducesResponseType(
        StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<LoginResponse>> Login(
        LoginRequest request)
    {
        try
        {
            var response =
                await _authenticationService.LoginAsync(request);

            if (!response.Sucesso)
                return BadRequest(response);

            return Ok(response);
        }
        catch (Exception)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new LoginResponse
                {
                    Sucesso = false,
                    Mensagem =
                        "Ocorreu um erro interno ao processar o login."
                });
        }
    }

    /// <summary>
    /// Cria a senha no primeiro acesso do usuário autenticado.
    /// </summary>
    [Authorize]
    [HttpPost("criar-senha")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> CriarSenha(
        CriarSenhaRequest request)
    {
        var claimUsuarioId =    User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");

        if (claimUsuarioId is null)
            return Unauthorized();

        if (!Guid.TryParse(
                claimUsuarioId.Value,
                out var usuarioId))
        {
            return Unauthorized();
        }

        await _authenticationService.CriarSenhaAsync(
            usuarioId,
            request);

        return NoContent();
    }

    /// <summary>
    /// Altera a senha do usuário autenticado.
    /// </summary>
    [Authorize]
    [HttpPost("alterar-senha")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> AlterarSenha(
        AlterarSenhaRequest request)
    {
        var claimUsuarioId = User.FindFirst("sub");

        if (claimUsuarioId is null)
            return Unauthorized();

        if (!Guid.TryParse(
                claimUsuarioId.Value,
                out var usuarioId))
        {
            return Unauthorized();
        }

        await _authenticationService.AlterarSenhaAsync(
            usuarioId,
            request);

        return NoContent();
    }

    /// <summary>
    /// Solicita redefinição de senha.
    /// </summary>
    [AllowAnonymous]
    [HttpPost("esqueci-senha")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> EsqueciSenha(
        EsqueciSenhaRequest request)
    {
        await _authenticationService.EsqueciSenhaAsync(request);

        return NoContent();
    }

    /// <summary>
    /// Renova o token JWT.
    /// </summary>
    [AllowAnonymous]
    [HttpPost("refresh-token")]
    public async Task<ActionResult<LoginResponse>> RefreshToken(
        RefreshTokenRequest request)
    {
        var response =
            await _authenticationService.RefreshTokenAsync(request);

        if (!response.Sucesso)
            return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Efetua logout.
    /// </summary>
    [Authorize]
    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Logout()
    {
        var claimUsuarioId = User.FindFirst("sub");

        if (claimUsuarioId is null)
            return Unauthorized();

        if (!Guid.TryParse(
                claimUsuarioId.Value,
                out var usuarioId))
        {
            return Unauthorized();
        }

        await _authenticationService.LogoutAsync(usuarioId);

        return NoContent();
    }
}