using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms;
using mLingoCore.Models.Forms.Accounts;
using mLingoCore.Services;
using mLingo.Controllers.Api;

namespace mLingo.Modules
{
    /// <summary>
    /// Standard implementation of <see cref="IAccountManager"/> used to manage user accounts.
    /// </summary>
    public class StandardAccountManager : IAccountManager
    {
        #region PublicProperties

        public AppDbContext DbContext { get; set; }

        public UserManager<AppUser> UserManager { get; set; }

        public IConfiguration Configuration { get; set; }

        #endregion

        #region Implementation

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> Register(RegisterForm form)
        {
            if (form == null || RegisterForm.ValidateForm(form) == false)
                return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidRegistrationCredentials, 400);

            var user = new AppUser
            {
                UserName = form.Username,
                Email = form.Email,
                PhoneNumber = form.PhoneNo,
                UserInformation = new UserInformation
                {
                    FirstName = form.FirstName,
                    LastName = form.LastName,
                    Id = Guid.NewGuid().ToString(),
                    DateOfBirth = form.DateOfBirth,
                    Age = form.DateOfBirth != null ? (DateTime.Today.Year - DateTime.Parse(form.DateOfBirth).Year) : 0
                }
            };

            var result = await UserManager.CreateAsync(user, form.Password);

            if (!result.Succeeded)
                return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidRegistrationCredentials, 400);

            var addRoleResult = await UserManager.AddToRoleAsync(user, "Member");

            if (!addRoleResult.Succeeded) 
                return ApiResponse.StandardErrorResponse(ErrorMessages.Server.ActionFail("assign roles"), 500);

            var userIdentity = await UserManager.FindByNameAsync(user.UserName);
            var identityResponse = userIdentity.Credentials(await userIdentity.GenerateJwtToken(UserManager, Configuration));

            return ApiResponse.StandardSuccessResponse(identityResponse, 200);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> Login(LoginForm form)
        {
            if (form == null || LoginForm.ValidateForm(form) == false)
                return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidLoginCredentials, 400);

            var isEmail = form.UserId.Contains("@");

            var user = isEmail
                ? await UserManager.FindByEmailAsync(form.UserId)
                : await UserManager.FindByNameAsync(form.UserId);

            if (user == null)
                return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidLoginCredentials, 400);
            
                

            var isPasswordOk = await UserManager.CheckPasswordAsync(user, form.Password);

            if (!isPasswordOk)
                return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidLoginCredentials, 400);

            var userCredentials = user.Credentials(await user.GenerateJwtToken(UserManager, Configuration));
            return ApiResponse.StandardSuccessResponse(userCredentials, 200);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> Details(string username)
        {
            var user = await UserManager.FindByNameAsync(username);

            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            var credentials = user.CredentialsNoToken();
            return ApiResponse.StandardSuccessResponse(credentials, 200);
        }

        public async Task<ApiResponse> DetailsById(string id)
        {
            var user = await UserManager.FindByIdAsync(id);

            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(id), 404);

            var credentials = user.CredentialsNoToken();
            return ApiResponse.StandardSuccessResponse(credentials, 200);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> Delete(string username)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);
            var res = await UserManager.DeleteAsync(user);
            return res.Succeeded
                ? ApiResponse.StandardSuccessResponse(null, 200)
                : ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.ActionFail("delete and account"), 500);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> EditInformation(string username, EditInformationForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            try
            {
                if (form.LastName != null) user.UserInformation.LastName = form.LastName;
                if (form.FirstName != null) user.UserInformation.FirstName = form.FirstName;
                if (form.DateOfBirth != null)
                {
                    user.UserInformation.DateOfBirth = form.DateOfBirth;
                    user.UserInformation.Age = DateTime.Today.Year - DateTime.Parse(form.DateOfBirth).Year;
                }

                DbContext.SaveChanges();
                return ApiResponse.StatusCodeResponse(200);
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("update your information"), e.StackTrace, 500);
            }
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> RequestChangeToken(string username, string prop, EditMail form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            if (prop == null) return ApiResponse.StandardErrorResponse(ErrorMessages.Server.ActionFail("request change token"), 400);

            var token = prop switch
            {
                "email" => form != null
                    ? await UserManager.GenerateChangeEmailTokenAsync(user, form.Email)
                    : "No email",
                "password" => await UserManager.GeneratePasswordResetTokenAsync(user),
                _ => "Invalid prop"
            };

            if (token == "Invalid prop" || token == "No email")
                return ApiResponse.StandardErrorResponse(token, 400);

            return ApiResponse.StandardSuccessResponse(token, 200);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> ChangeEmail(string username, string token, EditMail form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            IdentityResult res;
            try
            {
                res = await UserManager.ChangeEmailAsync(user, form.Email, token);
                DbContext.SaveChanges();
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("change email"), e.StackTrace, 500);
            }
            return res.Succeeded 
                ? ApiResponse.StandardSuccessResponse(null, 200) 
                : ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidChangeToken, 400);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> ChangePassword(string username, ResetPasswordForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            IdentityResult res;
            try
            {
                res = await UserManager.ChangePasswordAsync(user, form.OldPassword, form.NewPassword);
                DbContext.SaveChanges();
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("change password"), e.StackTrace, 500);
            }
            return res.Succeeded
                ? ApiResponse.StandardSuccessResponse(null, 200)
                : ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidChangeToken, 400);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<ApiResponse> ResetPassword(string username, string token, ResetPasswordForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            IdentityResult res;
            try
            {
                res = await UserManager.ResetPasswordAsync(user, token, form.NewPassword);
                DbContext.SaveChanges();
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("reset password"), e.StackTrace, 500);
            }
            return res.Succeeded
                ? ApiResponse.StandardSuccessResponse(null, 200)
                : ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.InvalidChangeToken, 400);
        }

        #endregion
    }
}
