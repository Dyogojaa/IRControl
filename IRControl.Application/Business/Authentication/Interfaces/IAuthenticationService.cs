using IRControl.Application.Business.Authentication.DTOs;

namespace IRControl.Application.Business.Authentication.Interfaces;

public interface IAuthenticationService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);

    Task CriarSenhaAsync(
        Guid usuarioId,
        CriarSenhaRequest request);

    Task AlterarSenhaAsync(
        Guid usuarioId,
        AlterarSenhaRequest request);

    Task EsqueciSenhaAsync(
        EsqueciSenhaRequest request);

    Task<LoginResponse> RefreshTokenAsync(
        RefreshTokenRequest request);

    Task LogoutAsync(Guid usuarioId);


    Task RedefinirSenhaAsync(
        RedefinirSenhaRequest request);
}