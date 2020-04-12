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
using mLingoCore.Models.Forms.Accounts;
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
        /// <remarks>
        /// {
        ///     "Username": "example1",
        ///     "Password": "zaq1@WSX",
        ///     "Email": "email@example1.com",
        ///     "FirstName": "John",
        ///     "LastName": "Doe",
        ///     "DateOfBirth": "iso-formatted-timestamp",
        ///     "PhoneNo": "123456789"
        /// } 
        /// </remarks>
        /// <param name="registerForm">User information passed through request body</param>
        /// <returns>returns appropriate <see cref="ApiResponse"/></returns>
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterFormModel registerForm)
        {
            var res = await accountManager.Register(registerForm);
            return this.HandleManagerResponse(res);
        }


        /// <summary>
        /// Logs user in.
        /// </summary>
        /// <remarks>
        /// {
        ///     "Username": "example1",
        ///     "Password": "zaq1@WSX"
        /// }
        /// </remarks>
        /// <param name="loginForm">User information passed through request body</param>
        /// <returns>returns appropriate <see cref="ApiResponse"/></returns>
        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginFormModel loginForm)
        {
            var res = await accountManager.Login(loginForm);
            return this.HandleManagerResponse(res);
        }

        #endregion

        #region AccountInformation

        /// <summary>
        /// Returns all the account details based on current user context
        /// </summary>
        /// <returns>returns approperiate <see cref="ApiResponse"/></returns>
        [HttpGet]
        [Route("details")]
        public async Task<IActionResult> Details()
        {
            var res = await accountManager.Details(HttpContext.User.Identity.Name);
            return this.HandleManagerResponse(res);
        }

        #endregion

        #region AccountManagement

        /// <summary>
        /// Deletes user account
        /// </summary>
        /// <returns>Http status code</returns>
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
        /// <remarks>
        /// {
        ///     "FirstName": "edited_firstname",
        ///     "LastName": "edited_lastname",
        ///     "DateOfBirth": "iso_formatted_timestamp",
        ///     "Age": 0
        /// }
        /// </remarks>
        /// <param name="userId">id of account</param>
        /// <param name="newInformation">updated information</param>
        /// <returns>Http status code</returns>
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
        /// <remarks>
        /// {
        ///     "Email": "new@mail.com"
        /// }
        /// </remarks>
        /// <param name="userId"></param>
        /// <param name="prop">Property user wants to change (email / password)</param>
        /// <param name="newEmail">Parameter required to generate token for email change</param>
        /// <returns><see cref="ApiResponse"/> with token string</returns>
        [HttpGet]
        [Route("requestchangetoken")]
        public async Task<IActionResult> RequestChangeToken([FromQuery] string prop, [FromBody]EditMailForm newEmail = null)
        {
            var res = await accountManager.RequestChangeToken(HttpContext.User.Identity.Name, prop, newEmail);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Changes email of an account
        /// </summary>
        /// <remarks>
        /// {
        ///     "Email": "new@email.com"
        /// }
        /// </remarks>
        /// <param name="userId"></param>
        /// <param name="token">Email change token generated via <see cref="RequestChangeToken"/></param>
        /// <param name="newEmail"></param>
        /// <returns>Http status code</returns>
        [HttpPut]
        [Route("changeemail")]
        public async Task<IActionResult> ChangeEmail([FromQuery] string token, [FromBody]EditMailForm newEmail)
        {
            var res = await accountManager.ChangeEmail(HttpContext.User.Identity.Name, token, newEmail);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Resets password for the account
        /// </summary>
        /// <remarks>
        /// {
        ///     "OldPassword": "old_password",
        ///     "NewPassword": "new_password"
        /// }
        /// </remarks>
        /// <param name="userId"></param>
        /// <param name="token">reset password token generated via <see cref="RequestChangeToken"/></param>
        /// <param name="newPassword"></param>
        /// <returns>Http status code</returns>
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
        /// <param name="userId"></param>
        /// <param name="resetPasswordForm">Information required to change password <see cref="ResetPasswordForm"/></param>
        /// <returns>Http status code</returns>
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