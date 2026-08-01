using IRControl.Infrastructure.Authentication.Interface;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace IRControl.Infrastructure.Authentication.Security
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

        public bool IsAuthenticated =>
            User?.Identity?.IsAuthenticated ?? false;

        public Guid? UsuarioId
        {
            get
            {
                var claim = User?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

                return Guid.TryParse(claim, out var id)
                    ? id
                    : null;
            }
        }

        public string? Login =>
            User?.FindFirst(JwtRegisteredClaimNames.UniqueName)?.Value;

        public string? Nome =>
            User?.FindFirst("nome")?.Value;
    }
}
