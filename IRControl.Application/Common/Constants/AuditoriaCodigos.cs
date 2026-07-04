namespace IRControl.Application.Common.Constants;

public static class AuditoriaCodigos
{
    // Holerites
    public const string HoleriteCompleto = "HOL001";
    public const string HoleriteDuplicado = "HOL002";
    public const string HoleriteValorNegativo = "HOL003";
    public const string HoleriteSalarioZero = "HOL004";
    public const string HoleriteMesInvalido = "HOL005";

    // Informes
    public const string InformeNaoEncontrado = "INF001";
    public const string InformeDuplicado = "INF002";

    // Conferência
    public const string SalarioDivergente = "CONF001";
    public const string InssDivergente = "CONF002";
    public const string IrrfDivergente = "CONF003";

    // Dependentes
    public const string DependenteCpfInvalido = "DEP001";
    public const string DependenteDuplicado = "DEP002";

    // Despesas Médicas
    public const string DespesaSemCpfCnpj = "MED001";
    public const string ReembolsoMaiorQueDespesa = "MED002";
    public const string DependenteNaoEncontrado = "MED003";
}