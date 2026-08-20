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
        if (string.IsNullOrWhiteSpace(request.SenhaAtual))
            throw new ArgumentException(
                "Informe a senha atual.");

        if (string.IsNullOrWhiteSpace(request.NovaSenha))
            throw new ArgumentException(
                "Informe a nova senha.");

        if (string.IsNullOrWhiteSpace(request.ConfirmacaoSenha))
            throw new ArgumentException(
                "Confirme a nova senha.");

        if (request.NovaSenha != request.ConfirmacaoSenha)
            throw new ArgumentException(
                "As senhas não conferem.");

        if (request.NovaSenha.Length < 8)
            throw new ArgumentException(
                "A nova senha deve possuir pelo menos 8 caracteres.");

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(x => x.Id == usuarioId);

        if (usuario is null)
            throw new KeyNotFoundException(
                "Usuário não encontrado.");

        if (!usuario.Ativo)
            throw new InvalidOperationException(
                "Usuário inativo.");

        var senhaAtualValida =
            BCrypt.Net.BCrypt.Verify(
                request.SenhaAtual,
                usuario.SenhaHash);

        if (!senhaAtualValida)
            throw new ArgumentException(
                "A senha atual está incorreta.");

        usuario.SenhaHash =
            BCrypt.Net.BCrypt.HashPassword(
                request.NovaSenha);

        await _context.SaveChangesAsync();
    }

    public async Task EsqueciSenhaAsync(
    EsqueciSenhaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
            throw new ArgumentException(
                "Informe o e-mail.");

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(x =>
                x.Email == request.Email &&
                x.Ativo);

        if (usuario is null)
            throw new KeyNotFoundException(
                "Usuário não encontrado.");

        var recuperacoes = await _context.RecuperacoesSenha
            .Where(x =>
                x.UsuarioId == usuario.Id &&
                !x.Utilizado)
            .ToListAsync();

        foreach (var recuperacao in recuperacoes)
        {
            recuperacao.Utilizado = true;
        }

        var codigo =
            Random.Shared.Next(100000, 1000000)
                .ToString();

        var recuperacaoSenha = new RecuperacaoSenha
        {
            Id = Guid.NewGuid(),

            UsuarioId = usuario.Id,

            Codigo = codigo,

            Expiracao =
                DateTime.UtcNow.AddMinutes(15),

            Utilizado = false,

            DataCriacao = DateTime.UtcNow,
        };

        _context.RecuperacoesSenha.Add(
            recuperacaoSenha);

        await _context.SaveChangesAsync();
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

    public async Task RedefinirSenhaAsync(
    RedefinirSenhaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
            throw new ArgumentException(
                "Informe o e-mail.");

        if (string.IsNullOrWhiteSpace(request.Codigo))
            throw new ArgumentException(
                "Informe o código de recuperação.");

        if (string.IsNullOrWhiteSpace(request.NovaSenha))
            throw new ArgumentException(
                "Informe a nova senha.");

        if (request.NovaSenha.Length < 8)
            throw new ArgumentException(
                "A nova senha deve possuir pelo menos 8 caracteres.");

        if (request.NovaSenha != request.ConfirmacaoSenha)
            throw new ArgumentException(
                "As senhas não conferem.");

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(x =>
                x.Email == request.Email &&
                x.Ativo);

        if (usuario is null)
            throw new KeyNotFoundException(
                "Usuário não encontrado.");

        var recuperacao = await _context.RecuperacoesSenha
            .Where(x =>
                x.UsuarioId == usuario.Id &&
                x.Codigo == request.Codigo &&
                !x.Utilizado)
            .OrderByDescending(x => x.DataCriacao)
            .FirstOrDefaultAsync();

        if (recuperacao is null)
            throw new ArgumentException(
                "Código de recuperação inválido.");

        if (recuperacao.Expiracao < DateTime.UtcNow)
            throw new ArgumentException(
                "O código de recuperação expirou.");

        usuario.SenhaHash =
            BCrypt.Net.BCrypt.HashPassword(
                request.NovaSenha);

        usuario.PrimeiroAcesso = false;

        recuperacao.Utilizado = true;

        await _context.SaveChangesAsync();
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