using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api.ResponseModels;
using mLingoCore.Models.Forms.Accounts;
using Newtonsoft.Json;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handles any action connected with user account
    /// </summary>
    [AuthorizeToken]
    public class AccountController : Controller
    {
        #region PrivateFields

        private readonly ILogger apiLogger;

        private readonly IConfiguration apiConfiguration;

        private readonly AppDbContext apiDbContext;

        private readonly UserManager<AppUser> apiUserManager;

        private readonly SignInManager<AppUser> apiSignInManager;

        #endregion

        #region Constructor

        public AccountController(
            ILogger<AccountController> logger,
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

        #region LoginAndRegister

        /// <summary>
        /// Registers new user account.
        /// </summary>
        /// <param name="registerForm">User information passed through request body</param>
        /// <returns>returns appropriate <see cref="ApiResponse{T}"/></returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterFormModel registerForm)
        {
            if (registerForm == null || RegisterFormModel.ValidateForm(registerForm) == false)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidRegistration
                });

            var user = new AppUser
            {
                UserName = registerForm.Username,
                Email = registerForm.Email,
                PhoneNumber = registerForm.PhoneNo,
                UserInformation = new UserInformation
                {
                    FirstName = registerForm.FirstName,
                    LastName = registerForm.LastName,
                    Id = Guid.NewGuid().ToString(),
                    DateOfBirth = registerForm.DateOfBirth,
                    Age = registerForm.DateOfBirth != null ? (DateTime.Today.Year - DateTime.Parse(registerForm.DateOfBirth).Year) : 0
                }
            };

            var result = await apiUserManager.CreateAsync(user, registerForm.Password);

            if (result.Succeeded)
            {
                var userIdentity = await apiUserManager.FindByNameAsync(user.UserName);

                var res = JsonConvert.SerializeObject(new ApiResponse<CredentialsResponse>
                {
                    Response = userIdentity.Credentials(userIdentity.GenerateJwtToken(apiConfiguration))
                });

                return Ok(res);
            }

            return BadRequest(new ApiResponse<CredentialsResponse>
            {
                ErrorMessage = ErrorMessages.InvalidRegistration
            });
        }


        /// <summary>
        /// Logs user in.
        /// </summary>
        /// <param name="loginForm">User information passed through request body</param>
        /// <returns>returns appropriate <see cref="ApiResponse{T}"/></returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginFormModel loginForm)
        {
            if (loginForm == null || LoginFormModel.ValidateForm(loginForm) == false)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidLogin
                });

            var isEmail = loginForm.UserId.Contains("@");

            var user = isEmail
                ? await apiUserManager.FindByEmailAsync(loginForm.UserId)
                : await apiUserManager.FindByNameAsync(loginForm.UserId);

            if (user == null)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = isEmail ? ErrorMessages.UserEmailNotFound : ErrorMessages.UsernameNotFound
                });

            var isPasswordOk = await apiUserManager.CheckPasswordAsync(user, loginForm.Password);

            if (!isPasswordOk)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidLogin
                });
            
            var res = JsonConvert.SerializeObject(new ApiResponse<CredentialsResponse>
            {
                Response = user.Credentials(user.GenerateJwtToken(apiConfiguration))
            });

            return Ok(res);
        }

        #endregion

        #region AccountInformation

        /// <summary>
        /// Returns all the account details based on current user context
        /// </summary>
        /// <returns>returns approperiate <see cref="ApiResponse{T}"/></returns>
        public async Task<IActionResult> Details()
        {

            var user = await apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user == null)
            {
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.UsernameNotFound
                });
            }

            var res = JsonConvert.SerializeObject(new ApiResponse<CredentialsResponse>
            {
                Response = user.CredentialsNoToken()
            });

            return Ok(res);
        }

        #endregion

        #region AccountManagement

        /// <summary>
        /// Deletes user account
        /// </summary>
        /// <param name="userId">Id of account to delete</param>
        /// <returns>Http status code</returns>
        [HttpDelete]
        public async Task<IActionResult> Delete(string userId)
        {
            var user = await apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return NotFound();
            if (user.Id != userId) return Unauthorized();
            var res = await apiUserManager.DeleteAsync(user);
            if(res.Succeeded) return Ok();
            return NotFound();
        }

        /// <summary>
        /// Edit accounts <see cref="UserInformation"/>
        /// </summary>
        /// <param name="userId">id of account</param>
        /// <param name="newInformation">updated information</param>
        /// <returns>Http status code</returns>
        [HttpPut]
        public async Task<IActionResult> EditInformation(string userId, [FromBody] EditInformationForm newInformation)
        {
            var user = await apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return NotFound();
            if (user.Id != userId) return Unauthorized();

            try
            {
                if (newInformation.LastName != null) user.UserInformation.LastName = newInformation.LastName;
                if (newInformation.FirstName != null) user.UserInformation.FirstName = newInformation.FirstName;
                if (newInformation.DateOfBirth != null)
                {
                    user.UserInformation.DateOfBirth = newInformation.DateOfBirth;
                    user.UserInformation.Age = DateTime.Today.Year - DateTime.Parse(newInformation.DateOfBirth).Year;
                }

                apiDbContext.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Generates token to change email / password
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="prop">Property user wants to change (email / password)</param>
        /// <param name="newEmail">Parameter required to generate token for email change</param>
        /// <returns><see cref="ApiResponse"/> with token string</returns>
        [HttpGet]
        public async Task<IActionResult> RequestChangeToken(string userId, string prop, [FromBody]EditMailForm newEmail = null)
        {
            var user = await apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return NotFound();
            if (user.Id != userId) return Unauthorized();

            if (prop == null)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = "Invalid prop"
                });

            var token = prop switch
            {
                "email" => newEmail != null
                    ? await apiUserManager.GenerateChangeEmailTokenAsync(user, newEmail.Email)
                    : "No email",
                "password" => await apiUserManager.GeneratePasswordResetTokenAsync(user),
                _ => "Invalid prop"
            };

            if (token == "Invalid prop" || token == "No email")
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = token
                });

            var res = JsonConvert.SerializeObject(new ApiResponse
            {
                Response = token
            });
            return Ok(res);
        }

        /// <summary>
        /// Changes email of an account
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="token">Email change token generated via <see cref="RequestChangeToken"/></param>
        /// <param name="newEmail"></param>
        /// <returns>Http status code</returns>
        [HttpPut]
        public async Task<IActionResult> ChangeEmail(string userId, string token, [FromBody]EditMailForm newEmail)
        {
            var user = await apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return NotFound();
            if (user.Id != userId) return Unauthorized();

            var res = await apiUserManager.ChangeEmailAsync(user, newEmail.Email, token);
            apiDbContext.SaveChanges();
            
            if (res.Succeeded) return Accepted();
            return BadRequest();
        }

        /// <summary>
        /// Resets password for the account
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="token">reset password token generated via <see cref="RequestChangeToken"/></param>
        /// <param name="newPassword"></param>
        /// <returns>Http status code</returns>
        [HttpPut]
        public async Task<IActionResult> ResetPassword(string userId, string token, [FromBody] string newPassword)
        {
            var user = await apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return NotFound();
            if (user.Id != userId) return Unauthorized();

            var res = await apiUserManager.ResetPasswordAsync(user, token, newPassword);
            apiDbContext.SaveChanges();

            if (res.Succeeded) return Accepted();
            return BadRequest();
        }

        /// <summary>
        /// Changes password for the account
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="resetPasswordForm">Information required to change password <see cref="ResetPasswordForm"/></param>
        /// <returns>Http status code</returns>
        [HttpPut]
        public async Task<IActionResult> ChangePassword(string userId, [FromBody] ResetPasswordForm resetPasswordForm)
        {
            var user = await apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return NotFound();
            if (user.Id != userId) return Unauthorized();

            var res = await apiUserManager.ChangePasswordAsync(user, resetPasswordForm.OldPassword,
                resetPasswordForm.NewPassword);

            if (res.Succeeded) return Accepted();
            return BadRequest();
        }

        #endregion

        #region ForTesting

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DetailsTesting([FromBody] LoginFormModel login)
        {
            var user = await apiUserManager.FindByNameAsync(login.UserId);
            user.UserInformation = apiDbContext.UserInformation.FirstOrDefault(e => e.Id.Equals(user.UserInformationId));

             var res = JsonConvert.SerializeObject(new ApiResponse<CredentialsResponse>
             {
                 Response = user.Credentials("")
             });
             return Ok(res);
        }

        #endregion
    }
}
 