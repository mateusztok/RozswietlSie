using Microsoft.AspNetCore.Mvc;
using RozswietlSie.IServices;
using RozswietlSie.Services;

namespace RozswietlSie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyAdminController : Controller
    {
        
        private readonly IMyAdminService _myAdminService;

        public MyAdminController(IMyAdminService myAdminService)
        {
            _myAdminService = myAdminService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            string username = request.Username;
            string password = request.Password;
            string role = _myAdminService.Login(username, password);

            try
            {
                HttpContext.Session.SetString("UserRole", role);
                return Ok(new { Message = "Login successful", Roles = role });
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("checklogin")]
        public IActionResult CheckLogin()
        {
            string role = HttpContext.Session.GetString("UserRole");

            if (!string.IsNullOrEmpty(role))
            {
                return Ok(new { IsLoggedIn = true, Roles = role });
            }
            else
            {
                return Ok(new { IsLoggedIn = false });
            }
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            try
            {
                HttpContext.Session.Remove("UserRole");
                return Ok(new { Message = "Logout successful" });
            }
            catch
            {
                return NotFound();
            }
        }
    }


public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}