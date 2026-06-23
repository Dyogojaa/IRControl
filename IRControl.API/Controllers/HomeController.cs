using Microsoft.AspNetCore.Mvc;

namespace IRControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            Sistema = "IRControl",
            Versao = "1.0",
            Data = DateTime.Now
        });
    }
}