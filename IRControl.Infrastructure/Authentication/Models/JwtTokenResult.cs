namespace IRControl.Infrastructure.Authentication.Models;

public class JwtTokenResult
{
    public string Token { get; set; } = string.Empty;

    public DateTime Expiration { get; set; }
}