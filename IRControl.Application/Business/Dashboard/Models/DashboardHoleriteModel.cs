namespace IRControl.Application.Business.Dashboard.Models;

public class DashboardHoleriteModel
{
    public int Esperados { get; set; }

    public int Cadastrados { get; set; }

    public int Faltantes => Esperados - Cadastrados;

    public decimal SalarioBruto { get; set; }

    public decimal Inss { get; set; }

    public decimal Irrf { get; set; }

    public decimal PlanoSaude { get; set; }

    public decimal PrevidenciaPrivada { get; set; }
}