using BCrypt.Net;
using IRControl.Infrastructure.Authentication.DTOs;
using IRControl.Infrastructure.Authentication.Interfaces;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Infrastructure.Authentication.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly AppDbContext _context;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthenticationService(
        AppDbContext context,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Login))
        {
            return new LoginResponse
            {
                Sucesso = false,
                Mensagem = "Informe o login."
            };
        }

        if (string.IsNullOrWhiteSpace(request.Senha))
        {
            return new LoginResponse
            {
                Sucesso = false,
                Mensagem = "Informe a senha."
            };
        }

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(x => x.Login == request.Login);

        if (usuario is null)
        {
            return new LoginResponse
            {
                Sucesso = false,
                Mensagem = "Usuário ou senha inválidos."
            };
        }

        if (!usuario.Ativo)
        {
            return new LoginResponse
            {
                Sucesso = false,
                Mensagem = "Usuário inativo."
            };
        }

        var senhaValida = BCrypt.Net.BCrypt.Verify(
            request.Senha,
            usuario.SenhaHash);

        if (!senhaValida)
        {
            return new LoginResponse
            {
                Sucesso = false,
                Mensagem = "Usuário ou senha inválidos."
            };
        }

        usuario.DataUltimoLogin = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var jwt = _jwtTokenGenerator.GenerateToken(usuario);

        return new LoginResponse
        {
            Sucesso = true,
            Mensagem = "Login realizado com sucesso.",
            Token = jwt.Token,
            Expiracao = jwt.Expiration,
            UsuarioId = usuario.Id,
            Nome = usuario.Nome,
            Login = usuario.Login
        };
    }

    public Task AlterarSenhaAsync(Guid usuarioId, AlterarSenhaRequest request)
    {
        throw new NotImplementedException();
    }

    public Task EsqueciSenhaAsync(EsqueciSenhaRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<LoginResponse> RefreshTokenAsync(RefreshTokenRequest request)
    {
        throw new NotImplementedException();
    }

    public Task LogoutAsync(Guid usuarioId)
    {
        throw new NotImplementedException();
    }
}