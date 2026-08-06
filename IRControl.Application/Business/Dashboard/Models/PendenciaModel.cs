using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Application.Business.Dashboard.Models
{
    public class PendenciaModel
    {
        public string Titulo { get; set; } = string.Empty;

        public string? Descricao { get; set; }

        public string Tipo { get; set; } = "warning";
    }
}
