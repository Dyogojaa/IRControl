using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Domain.Entities
{
    public class RecuperacaoSenha
    {
        public Guid Id { get; set; }

        public Guid UsuarioId { get; set; }

        public string Codigo { get; set; } = string.Empty;

        public DateTime Expiracao { get; set; }

        public bool Utilizado { get; set; }

        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        public Usuario Usuario { get; set; } = null!;
    }
}
