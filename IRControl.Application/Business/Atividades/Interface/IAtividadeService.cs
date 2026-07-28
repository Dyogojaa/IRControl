using IRControl.Application.Business.Atividades.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Application.Business.Atividades.Interface
{
    public interface IAtividadeService
    {
        Task<IEnumerable<AtividadeResponse>> ObterRecentesAsync(int quantidade = 10);

        Task RegistrarAsync(RegistrarAtividadeRequest request);
    }
}
