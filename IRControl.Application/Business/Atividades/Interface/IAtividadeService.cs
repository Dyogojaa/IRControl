using IRControl.Application.Business.Atividades.DTOs;
using IRControl.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Application.Business.Atividades.Interface
{
    public interface IAtividadeService
    {
        Task<List<AtividadeResponse>> ObterRecentesAsync(int quantidade = 10);

        Task RegistrarAsync(RegistrarAtividadeRequest request);

        Task RegistrarAsync( TipoAtividade tipo, string origem,  string titulo, string descricao,  Guid? usuarioId = null, string? usuarioLogin = null);

    }
}
