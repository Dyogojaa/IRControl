using IRControl.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Application.Business.Atividades.DTOs
{
    public class AtividadeResponse
    {
        public Guid Id { get; set; }

        public string Origem { get; set; } = string.Empty;

        public string Titulo { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public TipoAtividade Tipo { get; set; }

        public DateTime DataHora { get; set; }
    }
}
