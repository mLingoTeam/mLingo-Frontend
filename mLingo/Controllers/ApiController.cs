using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mLingoCore.Models.Forms;
using Newtonsoft.Json;

namespace mLingo.Controllers
{
    public class ApiController : Controller
    {
        private readonly ILogger apiLogger;
        public ApiController(ILogger<ApiController> logger)
        {
            apiLogger = logger;
        }

        [HttpPost]
        public IActionResult Register([FromBody]RegisterFormModel registerForm)
        {
            apiLogger.LogInformation($"User {registerForm.Username} registered");
            return Ok(registerForm);
        }


        [HttpPost]
        public IActionResult Login([FromBody]LoginFormModel loginForm)
        {
            apiLogger.LogInformation($"User {loginForm.Username} logged in");
            return Ok(loginForm);
        }
    }
}
