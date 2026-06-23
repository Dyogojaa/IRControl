using IRControl.Application.DTOs.Responses;
using IRControl.Domain.Entities;

namespace IRControl.Application.Mappings;

public static class DependenteMapping
{
    public static DependenteResponse ToResponse(
        this Dependente entity)
    {
        return new DependenteResponse
        {
            Id = entity.Id,
            Nome = entity.Nome,
            Cpf = entity.Cpf,
            DataNascimento = entity.DataNascimento,
            Parentesco = entity.Parentesco,
            DataCadastro = entity.DataCadastro
        };
    }
}