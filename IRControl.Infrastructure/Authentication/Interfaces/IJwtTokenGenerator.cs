using IRControl.Domain.Entities;
using IRControl.Infrastructure.Authentication.Models;

namespace IRControl.Infrastructure.Authentication.Interfaces;

public interface IJwtTokenGenerator
{
    JwtTokenResult GenerateToken(Usuario usuario);
}