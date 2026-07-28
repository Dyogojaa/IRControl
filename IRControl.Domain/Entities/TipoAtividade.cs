using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Domain.Entities
{
    public enum TipoAtividade
    {
        Login = 1,
        Cadastro = 2,
        Alteracao = 3,
        Exclusao = 4,
        Importacao = 5,
        Declaracao = 6,
        Configuracao = 7
    }
}
