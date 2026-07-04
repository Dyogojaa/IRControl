using System.ComponentModel.DataAnnotations;

namespace IRControl.Application.DTOs.Requests;

public class CreateInformeRendimentoRequest
{
    [Required(ErrorMessage = "O ano é obrigatório.")]
    [Range(2020, 2100,
        ErrorMessage = "Ano inválido.")]
    public int Ano { get; set; }

    [Required(ErrorMessage = "A empresa é obrigatória.")]
    [StringLength(150,
        ErrorMessage = "A empresa deve possuir no máximo 150 caracteres.")]
    public string Empresa { get; set; } = string.Empty;

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
        ErrorMessage = "O plano de saúde deve ser maior ou igual a zero.")]
    public decimal PlanoSaude { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "A previdência privada deve ser maior ou igual a zero.")]
    public decimal PrevidenciaPrivada { get; set; }
}