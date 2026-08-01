namespace IRControl.Application.Business.Authentication.DTOs;

public class AlterarSenhaRequest
{
    public string SenhaAtual { get; set; } = string.Empty;

    public string NovaSenha { get; set; } = string.Empty;

    public string ConfirmacaoSenha { get; set; } = string.Empty;
}
