using IRControl.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly AppDbContext _context;

    public HealthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var database = await _context.Database.CanConnectAsync();

        return Ok(new
        {
            status = database ? "Healthy" : "Unhealthy",
            database = database ? "Online" : "Offline",
            version = "1.0.0",
            serverTime = DateTime.Now
        });
    }
}