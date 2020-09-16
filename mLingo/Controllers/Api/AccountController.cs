using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Api;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms;
using mLingo.Models.Database.User;
using mLingo.Modules;
using mLingoCore.Models.Api.ResponseModels;
using mLingoCore.Models.Forms.Accounts;
using mLingoCore.Models.UserData;
using mLingoCore.Services;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handles any action connected with user account
    /// </summary>
    [AuthorizeToken]
    [Route("api/account")]
    public class AccountController : Controller
    {
        #region PrivateFields

        private readonly ILogger apiLogger;

        private readonly IAccountManager accountManager;

        private readonly UserManager<AppUser> userManager;

        #endregion

        #region Constructor

        public AccountController(
            ILogger<AccountController> logger,
            UserManager<AppUser> userManager,
            AppDbContext dbContext,
            IConfiguration configuration,
            IAccountManager accountManager)
        {
            apiLogger = logger;
            var am = (StandardAccountManager) accountManager;
            this.userManager = userManager;
            am.UserManager = userManager;
            am.DbContext = dbContext;
            am.Configuration = configuration;
            this.accountManager = am;
        }

        #endregion

        #region LoginAndRegister
        /// <summary>
        /// Registers new user account.
        /// </summary>
        /// <param name="registerForm">User information passed through request body</param>
        /// <response code="200">Returns newly created user credentials <see cref="CredentialsResponse"/></response>
        /// <response code="400">If user credentials are invalid</response>
        /// <response code="500">If server failed to create user</response>
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterForm registerForm)
        {
            var res = await accountManager.Register(registerForm);
            return this.HandleManagerResponse(res);
        }


        /// <summary>
        /// Logs user in.
        /// </summary>
        /// <param name="loginForm">User information passed through request body</param>
        /// <response code="200">Returns user credentials with access token <see cref="CredentialsResponse"/></response>
        /// <response code="400">If login credentials are incorrect</response>
        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginForm loginForm)
        {
            var res = await accountManager.Login(loginForm);
            return this.HandleManagerResponse(res);
        }

        #endregion

        #region AccountInformation

        /// <summary>
        /// Returns all the account details based on current user context
        /// </summary>
        /// <response code="200">Returns user credentials <see cref="CredentialsResponse"/></response>
        /// <response code="404">If user does not exist</response>
        [HttpGet]
        [Route("details")]
        public async Task<IActionResult> Details()
        {
            var res = await accountManager.Details(HttpContext.User.Identity.Name);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Returns all the account details based on id
        /// </summary>
        /// <response code="200">Returns user credentials <see cref="CredentialsResponse"/></response>
        /// <response code="404">If user does not exist</response>
        [HttpGet]
        [Route("detailsbyid")]
        public async Task<IActionResult> DetailsById([FromQuery] string id)
        {
            var res = await accountManager.DetailsById(id);
            return this.HandleManagerResponse(res);
        }

        #endregion

        #region AccountManagement

        /// <summary>
        /// Deletes user account
        /// </summary>
        /// <response code="200">User deleted</response>
        /// <response code="404">If user does not exist</response>
        /// <response code="500">Server error. Returns <see cref="ErrorRapport"/> in response body</response>
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete()
        {
            var res = await accountManager.Delete(HttpContext.User.Identity.Name);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Edit accounts <see cref="UserInformation"/>
        /// </summary>
        /// <param name="newInformation">updated information</param>
        /// <response code="200">If information updated successfully</response>
        /// <response code="500">Server error. Returns <see cref="ErrorRapport"/> in response body</response>
        [HttpPut]
        [Route("editinformation")]
        public async Task<IActionResult> EditInformation([FromBody] EditInformationForm newInformation)
        {
            var res = await accountManager.EditInformation(HttpContext.User.Identity.Name, newInformation);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Generates token to change email / password
        /// </summary>
        /// <param name="prop">Property user wants to change (email / password)</param>
        /// <param name="newEmail">Parameter required to generate token for email change</param>
        /// <response code="200">Token string in response body</response>
        /// <response code="400">Token could not be generated</response>
        /// <response code="404">User not found</response>
        [HttpGet]
        [Route("requestchangetoken")]
        public async Task<IActionResult> RequestChangeToken([FromQuery] string prop, [FromBody]EmailData newEmail = null)
        {
            var res = await accountManager.RequestChangeToken(HttpContext.User.Identity.Name, prop, newEmail);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Changes email of an account
        /// </summary>
        /// <param name="token">Email change token generated via <see cref="RequestChangeToken"/></param>
        /// <param name="newEmail"></param>
        /// <response code="200">Email changed successfully</response>
        /// <response code="400">Invalid/expired token. <see cref="ErrorRapport"/> in response body.</response>
        /// <response code="404">User does not exist</response>
        [HttpPut]
        [Route("changeemail")]
        public async Task<IActionResult> ChangeEmail([FromQuery] string token, [FromBody]EmailData newEmail)
        {
            var res = await accountManager.ChangeEmail(HttpContext.User.Identity.Name, token, newEmail);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Resets password for the account
        /// </summary>
        /// <param name="token">reset password token generated via <see cref="RequestChangeToken"/></param>
        /// <param name="newPassword"></param>
        /// <response code="200">Password reset successfully.</response>
        /// <response code="400">Invalid/expired token. <see cref="ErrorRapport"/> in response body.</response>
        /// <response code="404">User not found.</response>
        [HttpPut]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromQuery] string token, [FromBody] ResetPasswordForm newPassword)
        {
            var res = await accountManager.ResetPassword(HttpContext.User.Identity.Name, token, newPassword);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Changes password for the account
        /// </summary>
        /// <param name="resetPasswordForm">Information required to change password <see cref="mLingoCore.Models.Forms.Accounts.ResetPasswordForm"/></param>
        /// <response code="200">Password changed successfully</response>
        /// <response code="400">Invalid/expired token. <see cref="ErrorRapport"/> in response body.</response>
        /// <response code="404">User does not exist</response>
        [HttpPut]
        [Route("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ResetPasswordForm resetPasswordForm)
        {
            var res = await accountManager.ChangePassword(HttpContext.User.Identity.Name, resetPasswordForm);
            return this.HandleManagerResponse(res);
        }

        #endregion
    }
}