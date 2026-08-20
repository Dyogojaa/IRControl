using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Application.Business.Authentication.DTOs
{
    public class RedefinirSenhaRequest
    {
        public string Email { get; set; } = string.Empty;

        public string Codigo { get; set; } = string.Empty;

        public string NovaSenha { get; set; } = string.Empty;

        public string ConfirmacaoSenha { get; set; } = string.Empty;
    }
}
