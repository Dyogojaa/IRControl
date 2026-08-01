using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Domain.Entities
{
    public class Atividade
    {
        public Guid Id { get; set; }

        public string Origem { get; set; } = string.Empty;

        public string Titulo { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public TipoAtividade Tipo { get; set; }

        public DateTime DataHora { get; set; } = DateTime.UtcNow;

        public Guid? UsuarioId { get; set; }

        public string? UsuarioLogin { get; set; }
    }
}
