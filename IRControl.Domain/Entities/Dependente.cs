using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Domain.Entities
{
    public class Dependente
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public DateTime DataNascimento { get; set; }

        public string? Parentesco { get; set; }

        public DateTime DataCadastro { get; set; }

        public ICollection<DespesaMedica> DespesasMedicas { get; set; }
            = new List<DespesaMedica>();

    }
}
