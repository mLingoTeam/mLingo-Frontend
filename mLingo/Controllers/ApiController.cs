using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms;
using mLingoCore.Models.UserData;
using Newtonsoft.Json;

namespace mLingo.Controllers
{
    public class ApiController : Controller
    {
        #region PrivateFields

        private readonly ILogger apiLogger;

        private readonly UserManager<AppUser> apiUserManager;

        private readonly AppDbContext apiDbContext;

        private readonly SignInManager<AppUser> apiSignInManager;

        private readonly IConfiguration apiConfiguration;

        #endregion

        #region Constructor

        public ApiController(
            ILogger<ApiController> logger, 
            UserManager<AppUser> userManager, 
            AppDbContext dbContext, 
            SignInManager<AppUser> signInManager,
            IConfiguration configuration)
        {
            apiLogger = logger;
            apiUserManager = userManager;
            apiDbContext = dbContext;
            apiSignInManager = signInManager;
            apiConfiguration = configuration;
        }

        #endregion



        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterFormModel registerForm)
        {
            if (registerForm == null || RegisterFormModel.ValidateForm(registerForm) == false)
                return BadRequest(new ApiResponse<RegisterResponse>
                {
                    ErrorMessage = ErrorMessages.InvalidRegistration
                });

            var user = new AppUser
            {
                UserName = registerForm.Username,
                Email = registerForm.Email,
                UserInfo = new UserInformation
                {
                    FirstName = registerForm.FirstName,
                    LastName = registerForm.LastName,
                    Id = new Guid(),
                    DateOfBirth = registerForm.DateOfBirth,
                    Age = DateTime.Today.Year - DateTime.Parse(registerForm.DateOfBirth).Year
                }
            };

            var result = await apiUserManager.CreateAsync(user, registerForm.Password);

            if (result.Succeeded)
            {
                var userIdentity = await apiUserManager.FindByNameAsync(user.UserName);

                var res = JsonConvert.SerializeObject(new ApiResponse<RegisterResponse>
                {
                    Response = new RegisterResponse
                    {
                        Id = user.UserInfo.Id,
                        FirstName = user.UserInfo.FirstName,
                        LastName = user.UserInfo.LastName,
                        DateOfBirth = user.UserInfo.LastName,
                        Age = user.UserInfo.Age,
                        Token = user.GenerateJwtToken(apiConfiguration)
                    }
                });

                return Ok(res);
            }

            return BadRequest(new ApiResponse<RegisterResponse>
            {
                ErrorMessage = ErrorMessages.InvalidRegistration
            });
        }


        [HttpPost]
        public IActionResult Login([FromBody]LoginFormModel loginForm)
        {
            apiLogger.LogInformation($"User {loginForm.Username} logged in");
            return Ok(loginForm);
        }
    }
}
