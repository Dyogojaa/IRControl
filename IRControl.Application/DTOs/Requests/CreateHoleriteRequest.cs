using System.ComponentModel.DataAnnotations;

namespace IRControl.Application.DTOs.Requests;

public class CreateHoleriteRequest
{
    [Required(ErrorMessage = "O mês é obrigatório.")]
    [Range(1, 12, ErrorMessage = "O mês deve estar entre 1 e 12.")]
    public int Mes { get; set; }

    [Required(ErrorMessage = "O ano é obrigatório.")]
    [Range(2020, 2100, ErrorMessage = "O ano informado é inválido.")]
    public int Ano { get; set; }

    [Required(ErrorMessage = "O salário bruto é obrigatório.")]
    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "O salário bruto deve ser maior ou igual a zero.")]
    public decimal SalarioBruto { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "O INSS deve ser maior ou igual a zero.")]
    public decimal Inss { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "O IRRF deve ser maior ou igual a zero.")]
    public decimal Irrf { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "O salário líquido deve ser maior ou igual a zero.")]
    public decimal SalarioLiquido { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "O plano de saúde deve ser maior ou igual a zero.")]
    public decimal? PlanoSaude { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "A previdência privada deve ser maior ou igual a zero.")]
    public decimal? PrevidenciaPrivada { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "Outros descontos devem ser maiores ou iguais a zero.")]
    public decimal? OutrosDescontos { get; set; }
}