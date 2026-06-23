using IRControl.Application.DTOs.Responses;
using IRControl.Domain.Entities;

namespace IRControl.Application.Mappings;

public static class InformeRendimentoMapping
{
    public static InformeRendimentoResponse ToResponse(
        this InformeRendimento entity)
    {
        return new InformeRendimentoResponse
        {
            Id = entity.Id,
            Ano = entity.Ano,
            Empresa = entity.Empresa,
            SalarioBruto = entity.SalarioBruto,
            Inss = entity.Inss,
            Irrf = entity.Irrf,
            PlanoSaude = entity.PlanoSaude,
            PrevidenciaPrivada = entity.PrevidenciaPrivada
        };
    }
}