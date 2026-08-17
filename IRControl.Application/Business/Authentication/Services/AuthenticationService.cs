using IRControl.Application.Business.Atividades.Interface;
using IRControl.Application.Business.Authentication.DTOs;
using IRControl.Application.Business.Authentication.Interfaces;
using IRControl.Application.Common.Constants;
using IRControl.Domain.Entities;
using IRControl.Infrastructure.Authentication.Interface;
using IRControl.Infrastructure.Persistence;

using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Business.Authentication.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly AppDbContext _context;

    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    private readonly IAtividadeService _atividadeService;

    public AuthenticationService(
        AppDbContext context,
        IJwtTokenGenerator jwtTokenGenerator,
        IAtividadeService atividadeService)
    {
        _context = context;

        _jwtTokenGenerator = jwtTokenGenerator;

        _atividadeService = atividadeService;
    }

    public async Task CriarSenhaAsync(
        Guid usuarioId,
        CriarSenhaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Senha))
            throw new ArgumentException(
                "Informe a nova senha.");

        if (string.IsNullOrWhiteSpace(request.ConfirmarSenha))
            throw new ArgumentException(
                "Confirme a nova senha.");

        if (request.Senha != request.ConfirmarSenha)
            throw new ArgumentException(
                "As senhas não conferem.");

        if (request.Senha.Length < 8)
            throw new ArgumentException(
                "A senha deve possuir pelo menos 8 caracteres.");

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(x => x.Id == usuarioId);

        if (usuario is null)
            throw new KeyNotFoundException(
                "Usuário não encontrado.");

        if (!usuario.Ativo)
            throw new InvalidOperationException(
                "Usuário inativo.");

        if (!usuario.PrimeiroAcesso)
            throw new InvalidOperationException(
                "O primeiro acesso deste usuário já foi concluído.");

        usuario.SenhaHash =
            BCrypt.Net.BCrypt.HashPassword(request.Senha);

        usuario.PrimeiroAcesso = false;

        await _context.SaveChangesAsync();
    }

    public async Task AlterarSenhaAsync(
        Guid usuarioId,
        AlterarSenhaRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task EsqueciSenhaAsync(
        EsqueciSenhaRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task<LoginResponse> LoginAsync(
        LoginRequest request)
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
            .FirstOrDefaultAsync(
                x => x.Login == request.Login);

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

        var senhaValida =
            BCrypt.Net.BCrypt.Verify(
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

        usuario.DataUltimoLogin =
            DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _atividadeService.RegistrarAsync(TipoAtividade.Login, OrigensAtividade.Autenticacao,  TitulosAtividade.LoginRealizado,  DescricoesAtividade.Login(usuario.Login));

        var jwt =
            _jwtTokenGenerator.GenerateToken(usuario);

        return new LoginResponse
        {
            Sucesso = true,

            Mensagem =
                "Login realizado com sucesso.",

            Token = jwt.Token,

            Expiracao = jwt.Expiration,

            UsuarioId = usuario.Id,

            Nome = usuario.Nome,

            Login = usuario.Login,

            PrimeiroAcesso =
                usuario.PrimeiroAcesso
        };
    }

    public Task LogoutAsync(Guid usuarioId)
    {
        throw new NotImplementedException();
    }

    public Task<LoginResponse> RefreshTokenAsync(
        RefreshTokenRequest request)
    {
        throw new NotImplementedException();
    }
}