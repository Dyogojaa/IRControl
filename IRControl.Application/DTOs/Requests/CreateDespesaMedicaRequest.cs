using System.ComponentModel.DataAnnotations;

namespace IRControl.Application.DTOs.Requests;

public class CreateDespesaMedicaRequest
{
    [Required(ErrorMessage = "A data da despesa é obrigatória.")]
    public DateTime DataDespesa { get; set; }

    [Required(ErrorMessage = "O dependente é obrigatório.")]
    [Range(1, int.MaxValue,
        ErrorMessage = "Informe um dependente válido.")]
    public int DependenteId { get; set; }

    [Required(ErrorMessage = "Informe o nome do médico ou clínica.")]
    [StringLength(150,
        ErrorMessage = "O nome deve possuir no máximo 150 caracteres.")]
    public string MedicoClinica { get; set; } = string.Empty;

    [Required(ErrorMessage = "CPF ou CNPJ é obrigatório.")]
    [StringLength(18,
        ErrorMessage = "CPF/CNPJ inválido.")]
    public string CpfCnpj { get; set; } = string.Empty;

    [Required(ErrorMessage = "A especialidade é obrigatória.")]
    [StringLength(100,
        ErrorMessage = "A especialidade deve possuir no máximo 100 caracteres.")]
    public string Especialidade { get; set; } = string.Empty;

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "O valor deve ser maior ou igual a zero.")]
    public decimal Valor { get; set; }

    [Range(typeof(decimal), "0", "999999999.99",
        ErrorMessage = "O valor reembolsado deve ser maior ou igual a zero.")]
    public decimal ValorReembolsado { get; set; }

    [StringLength(500,
        ErrorMessage = "A observação deve possuir no máximo 500 caracteres.")]
    public string? Observacao { get; set; }
}