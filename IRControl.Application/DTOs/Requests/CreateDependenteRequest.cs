using System.ComponentModel.DataAnnotations;

namespace IRControl.Application.DTOs.Requests;

public class CreateDependenteRequest
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(150, ErrorMessage = "O nome deve possuir no máximo 150 caracteres.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O CPF é obrigatório.")]
    [StringLength(14, MinimumLength = 11,
        ErrorMessage = "O CPF informado é inválido.")]
    public string Cpf { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
    public DateTime DataNascimento { get; set; }

    [StringLength(50,
        ErrorMessage = "O parentesco deve possuir no máximo 50 caracteres.")]
    public string? Parentesco { get; set; }
}