using IRControl.Infrastructure.Authentication.DTOs;
using IRControl.Infrastructure.Authentication.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Realiza o login do usuário.
    /// </summary>
    [AllowAnonymous]
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        try
        {
            var response = await _authenticationService.LoginAsync(request);

            if (!response.Sucesso)
                return BadRequest(response);

            return Ok(response);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new LoginResponse
                {
                    Sucesso = false,
                    Mensagem = "Ocorreu um erro interno ao processar o login."
                });
        }
    }

    /// <summary>
    /// Altera a senha do usuário autenticado.
    /// </summary>
    [Authorize]
    [HttpPost("alterar-senha")]
    public async Task<IActionResult> AlterarSenha(AlterarSenhaRequest request)
    {
        var usuarioId = Guid.Parse(User.FindFirst("sub")!.Value);

        await _authenticationService.AlterarSenhaAsync(usuarioId, request);

        return NoContent();
    }

    /// <summary>
    /// Solicita redefinição de senha.
    /// </summary>
    [AllowAnonymous]
    [HttpPost("esqueci-senha")]
    public async Task<IActionResult> EsqueciSenha(EsqueciSenhaRequest request)
    {
        await _authenticationService.EsqueciSenhaAsync(request);

        return NoContent();
    }

    /// <summary>
    /// Renova o token JWT.
    /// </summary>
    [AllowAnonymous]
    [HttpPost("refresh-token")]
    public async Task<ActionResult<LoginResponse>> RefreshToken(RefreshTokenRequest request)
    {
        var response = await _authenticationService.RefreshTokenAsync(request);

        if (!response.Sucesso)
            return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Efetua logout.
    /// </summary>
    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var usuarioId = Guid.Parse(User.FindFirst("sub")!.Value);

        await _authenticationService.LogoutAsync(usuarioId);

        return NoContent();
    }
}