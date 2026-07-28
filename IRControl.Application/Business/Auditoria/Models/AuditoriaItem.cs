namespace IRControl.Application.Business.Auditoria.Models;

public class AuditoriaItem
{
    public string Categoria { get; set; } = string.Empty;

    public AuditoriaSeveridade Severidade { get; set; }

    public string SeveridadeDescricao =>
        Severidade switch
        {
            AuditoriaSeveridade.Informacao => "Informação",
            AuditoriaSeveridade.Alerta => "Alerta",
            AuditoriaSeveridade.Erro => "Erro",
            _ => "Desconhecido"
        };

    public string Descricao { get; set; } = string.Empty;
}