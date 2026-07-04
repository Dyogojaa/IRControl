namespace IRControl.Application.Business.Dashboard.Models;

public class DashboardModel
{
    public int Ano { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime UltimaAtualizacao { get; set; }

    public DashboardHoleriteModel Holerites { get; set; } = new();

    public DashboardInformeModel Informe { get; set; } = new();

    public DashboardDependenteModel Dependentes { get; set; } = new();

    public DashboardDespesaMedicaModel DespesasMedicas { get; set; } = new();

    public DashboardAuditoriaModel Auditoria { get; set; } = new();
}