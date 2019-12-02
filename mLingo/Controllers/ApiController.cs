using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mLingoCore.Models.Forms;

namespace mLingo.Controllers
{
    public class ApiController : Controller
    {
        [HttpPost]
        [Route("api/register")]
        public async Task<IActionResult> RegisterAsync([FromBody]RegisterFormModel registrationData)
        {
            await Task.Delay(0);
            return Ok();
        }


        [HttpPost]
        [Route("api/login")]
        public async Task<IActionResult> LoginAsync([FromBody]LoginFormModel loginData)
        {
            await Task.Delay(0);
            return Ok();
        }
    }
}
