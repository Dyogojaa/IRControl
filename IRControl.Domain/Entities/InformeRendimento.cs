using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Domain.Entities
{
    public class InformeRendimento
    {
        public int Id { get; set; }

        public int Ano { get; set; }

        public string Empresa { get; set; } = string.Empty;

        public decimal SalarioBruto { get; set; }

        public decimal Inss { get; set; }

        public decimal Irrf { get; set; }

        public decimal PlanoSaude { get; set; }

        public decimal PrevidenciaPrivada { get; set; }

        public DateTime DataCadastro { get; set; }

    }
}
