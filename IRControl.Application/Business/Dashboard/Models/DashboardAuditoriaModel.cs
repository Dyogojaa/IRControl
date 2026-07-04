namespace IRControl.Application.Business.Dashboard.Models;

public class DashboardAuditoriaModel
{
    public int TotalErros { get; set; }

    public int TotalAlertas { get; set; }

    public int TotalInformacoes { get; set; }

    public bool DeclaracaoApta { get; set; }
}