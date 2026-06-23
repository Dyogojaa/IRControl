using IRControl.Application.DTOs.Responses;
using IRControl.Domain.Entities;

namespace IRControl.Application.Mappings;

public static class HoleriteMapping
{
    public static HoleriteResponse ToResponse(
        this Holerite entity)
    {
        return new HoleriteResponse
        {
            Id = entity.Id,
            Mes = entity.Mes,
            Ano = entity.Ano,
            SalarioBruto = entity.SalarioBruto,
            Inss = entity.Inss,
            Irrf = entity.Irrf,
            SalarioLiquido = entity.SalarioLiquido,
            PlanoSaude = entity.PlanoSaude,
            PrevidenciaPrivada = entity.PrevidenciaPrivada,
            OutrosDescontos = entity.OutrosDescontos,
            DataCadastro = entity.DataCadastro
        };
    }
}