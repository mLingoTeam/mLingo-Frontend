using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Castle.Core;
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
using mLingo.Modules;
using mLingoCore.Models.Api.ResponseModels;
using mLingoCore.Models.Forms.Accounts;
using mLingoCore.Services;
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

        private readonly IAccountManager accountManager;

        #endregion

        #region Constructor

        public AccountController(
            ILogger<AccountController> logger,
            UserManager<AppUser> userManager,
            AppDbContext dbContext,
            SignInManager<AppUser> signInManager,
            IConfiguration configuration,
            StandardAccountManager accountManager)
        {
            apiLogger = logger;
            accountManager.UserManager = userManager;
            accountManager.DbContext = dbContext;
            accountManager.Configuration = configuration;
            this.accountManager = accountManager;
        }

        #endregion

        #region Helpers

        private IActionResult HandleManagerResponse(Pair<ApiResponse, int> res)
        {
            if (res.First == null) return StatusCode(res.Second);
            return StatusCode(res.Second, res.First);
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
            var res = await accountManager.Register(registerForm);
            return HandleManagerResponse(res);
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
            var res = await accountManager.Login(loginForm);
            return HandleManagerResponse(res);
        }

        #endregion

        #region AccountInformation

        /// <summary>
        /// Returns all the account details based on current user context
        /// </summary>
        /// <returns>returns approperiate <see cref="ApiResponse{T}"/></returns>
        public async Task<IActionResult> Details()
        {
            var res = await accountManager.Details(HttpContext.User.Identity.Name);
            return HandleManagerResponse(res);
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
            var res = await accountManager.Delete(userId, HttpContext.User.Identity.Name);
            return HandleManagerResponse(res);
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
            var res = await accountManager.EditInformation(userId, HttpContext.User.Identity.Name, newInformation);
            return HandleManagerResponse(res);
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
            var res = await accountManager.RequestChangeToken(userId, HttpContext.User.Identity.Name, prop, newEmail);
            return HandleManagerResponse(res);
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
            var res = await accountManager.ChangeEmail(userId, HttpContext.User.Identity.Name, token, newEmail);
            return HandleManagerResponse(res);
        }

        /// <summary>
        /// Resets password for the account
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="token">reset password token generated via <see cref="RequestChangeToken"/></param>
        /// <param name="newPassword"></param>
        /// <returns>Http status code</returns>
        [HttpPut]
        public async Task<IActionResult> ResetPassword(string userId, string token, [FromBody] ResetPasswordForm newPassword)
        {
            var res = await accountManager.ResetPassword(userId, HttpContext.User.Identity.Name, token, newPassword);
            return HandleManagerResponse(res);
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
            var res = await accountManager.ChangePassword(userId, HttpContext.User.Identity.Name, resetPasswordForm);
            return HandleManagerResponse(res);
        }

        #endregion
    }
}
 