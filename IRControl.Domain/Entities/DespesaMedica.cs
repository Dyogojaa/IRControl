using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Domain.Entities
{
    public class DespesaMedica
    {
        public int Id { get; set; }

        public DateTime DataDespesa { get; set; }

        public int DependenteId { get; set; }

        public Dependente Dependente { get; set; } = null!;

        public string MedicoClinica { get; set; } = string.Empty;

        public string CpfCnpj { get; set; } = string.Empty;

        public string Especialidade { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public decimal ValorReembolsado { get; set; }

        public string? Observacao { get; set; }

        public DateTime DataCadastro { get; set; }

        public decimal ValorDedutivel =>
            Valor - ValorReembolsado;

    }
}
