

using IRControl.Infrastructure.Authentication.DTOs;

namespace IRControl.Infrastructure.Authentication.Interfaces;

public interface IAuthenticationService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);

    Task AlterarSenhaAsync(Guid usuarioId, AlterarSenhaRequest request);

    Task EsqueciSenhaAsync(EsqueciSenhaRequest request);

    Task<LoginResponse> RefreshTokenAsync(RefreshTokenRequest request);

    Task LogoutAsync(Guid usuarioId);
}