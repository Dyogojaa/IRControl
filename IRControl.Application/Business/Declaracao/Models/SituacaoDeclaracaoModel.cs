namespace IRControl.Application.Business.Declaracao.Models;

public class SituacaoDeclaracaoModel
{
    public int Ano { get; set; }

    public bool DeclaracaoPronta { get; set; }

    public bool InformeEncontrado { get; set; }

    public bool ConferenciaOk { get; set; }

    public int HoleritesEncontrados { get; set; }

    public int HoleritesEsperados { get; set; } = 12;

    public int TotalDependentes { get; set; }

    public int TotalDespesasMedicas { get; set; }

    public decimal ValorTotalDespesas { get; set; }

    public decimal ValorTotalDedutivel { get; set; }

    public List<string> Pendencias { get; set; } = new();
}