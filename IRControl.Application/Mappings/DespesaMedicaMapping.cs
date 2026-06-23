using IRControl.Application.DTOs.Responses;
using IRControl.Domain.Entities;

namespace IRControl.Application.Mappings;

public static class DespesaMedicaMapping
{
    public static DespesaMedicaResponse ToResponse(
        this DespesaMedica entity)
    {
        return new DespesaMedicaResponse
        {
            Id = entity.Id,
            DataDespesa = entity.DataDespesa,
            DependenteId = entity.DependenteId,
            DependenteNome = entity.Dependente?.Nome ?? string.Empty,
            MedicoClinica = entity.MedicoClinica,
            CpfCnpj = entity.CpfCnpj,
            Especialidade = entity.Especialidade,
            Valor = entity.Valor,
            ValorReembolsado = entity.ValorReembolsado,
            ValorDedutivel = entity.Valor - entity.ValorReembolsado,
            Observacao = entity.Observacao,
            DataCadastro = entity.DataCadastro
        };
    }
}