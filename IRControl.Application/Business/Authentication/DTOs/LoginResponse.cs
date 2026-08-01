namespace IRControl.Application.Business.Authentication.DTOs;

public class LoginResponse
{
    public bool Sucesso { get; set; }

    public string Mensagem { get; set; } = string.Empty;

    public string? Token { get; set; }

    public DateTime? Expiracao { get; set; }

    public Guid? UsuarioId { get; set; }

    public string? Nome { get; set; }

    public string? Login { get; set; }
}