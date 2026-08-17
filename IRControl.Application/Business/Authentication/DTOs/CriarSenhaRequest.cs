namespace IRControl.Application.Business.Authentication.DTOs;

public class CriarSenhaRequest
{
    public string Senha { get; set; } = string.Empty;

    public string ConfirmarSenha { get; set; } = string.Empty;
}