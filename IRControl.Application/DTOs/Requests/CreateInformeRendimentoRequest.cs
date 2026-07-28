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
    public decimal SalarioBruto { get; set; }    
    public decimal Inss { get; set; }    
    public decimal Irrf { get; set; }
    
    public decimal PlanoSaude { get; set; }    
    public decimal PrevidenciaPrivada { get; set; }
}