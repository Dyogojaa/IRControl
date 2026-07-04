namespace IRControl.Application.Business.Dashboard.Models;

public class DashboardInformeModel
{
    public bool Cadastrado { get; set; }

    public string Empresa { get; set; } = string.Empty;

    public decimal SalarioBruto { get; set; }

    public decimal Inss { get; set; }

    public decimal Irrf { get; set; }
}