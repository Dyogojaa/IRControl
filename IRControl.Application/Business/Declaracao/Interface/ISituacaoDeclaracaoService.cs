namespace IRControl.Application.Business.Declaracao.Interfaces;

using IRControl.Application.Business.Declaracao.Models;

public interface ISituacaoDeclaracaoService
{
    Task<SituacaoDeclaracaoModel> ObterSituacaoAsync(int ano);
}