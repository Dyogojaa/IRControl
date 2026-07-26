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
    public decimal SalarioBruto { get; set; }

    public decimal Inss { get; set; }

    public decimal Irrf { get; set; }

    

    public decimal? PlanoSaude { get; set; }

    public decimal? PrevidenciaPrivada { get; set; }

    public decimal? OutrosDescontos { get; set; }
}