using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Infrastructure.Authentication.Interface;

public interface IUserContext
{
    bool IsAuthenticated { get; }

    Guid? UsuarioId { get; }

    string? Login { get; }

    string? Nome { get; }
}

