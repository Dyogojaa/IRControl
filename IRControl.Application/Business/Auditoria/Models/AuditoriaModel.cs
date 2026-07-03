namespace IRControl.Application.Business.Auditoria.Models;

public class AuditoriaModel
{
    public int Ano { get; set; }

    public int TotalErros { get; set; }

    public int TotalAlertas { get; set; }

    public int TotalInformacoes { get; set; }

    public bool DeclaracaoApta =>
        TotalErros == 0;

    public List<AuditoriaItem> Itens { get; set; } = new();
}