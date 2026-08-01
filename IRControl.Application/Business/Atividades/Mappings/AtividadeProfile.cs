using AutoMapper;
using IRControl.Application.Business.Atividades.DTOs;
using IRControl.Domain.Entities;

namespace IRControl.Application.Atividades.Mappings;

public class AtividadeProfile : Profile
{
    public AtividadeProfile()
    {
        CreateMap<Atividade, AtividadeResponse>();

        CreateMap<RegistrarAtividadeRequest, Atividade>();
    }
}