using System;
using System.Collections.Generic;
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
        private static KeyValuePair<ApiResponse, int> _Response(ApiResponse res, int statusCode) => new KeyValuePair<ApiResponse, int>(res, statusCode);
        private static KeyValuePair<ApiResponse, int> _Response(int statusCode) => new KeyValuePair<ApiResponse, int>(null, statusCode);

        #region PublicProperties

        public AppDbContext DbContext { get; set; }

        public UserManager<AppUser> UserManager { get; set; }

        public IConfiguration Configuration { get; set; }

        #endregion

        #region Implementation

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> Register(RegisterFormModel form)
        {
            if (form == null || RegisterFormModel.ValidateForm(form) == false)
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidRegistration
                }, 403);

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
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidRegistration
                }, 403);


            var userIdentity = await UserManager.FindByNameAsync(user.UserName);

            return _Response(new ApiResponse
            {
                Response = userIdentity.Credentials(userIdentity.GenerateJwtToken(Configuration))
            }, 200);

        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> Login(LoginFormModel form)
        {
            if (form == null || LoginFormModel.ValidateForm(form) == false)
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidLogin
                }, 403);

            var isEmail = form.UserId.Contains("@");

            var user = isEmail
                ? await UserManager.FindByEmailAsync(form.UserId)
                : await UserManager.FindByNameAsync(form.UserId);

            if (user == null)
                return _Response(new ApiResponse
                {
                    ErrorMessage = isEmail ? ErrorMessages.UserEmailNotFound : ErrorMessages.UsernameNotFound
                }, 404);

            var isPasswordOk = await UserManager.CheckPasswordAsync(user, form.Password);

            if (!isPasswordOk)
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidLogin
                }, 403);

            return _Response(new ApiResponse
            {
                Response = user.Credentials(user.GenerateJwtToken(Configuration))
            }, 200);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> Details(string username)
        {
            var user = await UserManager.FindByNameAsync(username);

            if (user == null)
            {
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.UsernameNotFound
                }, 403);
            }

            return _Response(new ApiResponse
            {
                Response = user.CredentialsNoToken()
            }, 200);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> Delete(string username)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return _Response(401);
            var res = await UserManager.DeleteAsync(user);
            return res.Succeeded ? _Response(200) : _Response(null, 404);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> EditInformation(string username, EditInformationForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return _Response(404);

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
                return _Response(200);
            }
            catch
            {
                return _Response(500);
            }
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> RequestChangeToken(string username, string prop, EditMailForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return _Response(404);

            if (prop == null)
                return _Response(new ApiResponse
                {
                    ErrorMessage = "Invalid prop"
                }, 403);

            var token = prop switch
            {
                "email" => form != null
                    ? await UserManager.GenerateChangeEmailTokenAsync(user, form.Email)
                    : "No email",
                "password" => await UserManager.GeneratePasswordResetTokenAsync(user),
                _ => "Invalid prop"
            };

            if (token == "Invalid prop" || token == "No email")
                return _Response(new ApiResponse
                {
                    ErrorMessage = token
                }, 403);

            return _Response(new ApiResponse
            {
                Response = token
            }, 200);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> ChangeEmail(string username, string token, EditMailForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return _Response(404);

            var res = await UserManager.ChangeEmailAsync(user, form.Email, token);
            DbContext.SaveChanges();

            return _Response(res.Succeeded ? 202 : 403);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> ChangePassword(string username, ResetPasswordForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return _Response(404);

            var res = await UserManager.ChangePasswordAsync(user, form.OldPassword, form.NewPassword);
            DbContext.SaveChanges();

            return _Response(res.Succeeded ? 202 : 403);
        }

        /// <summary>
        /// For documentation <see cref="AccountController"/>
        /// </summary>
        public async Task<KeyValuePair<ApiResponse, int>> ResetPassword(string username, string token, ResetPasswordForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return _Response(404);

            var res = await UserManager.ResetPasswordAsync(user, token, form.NewPassword);
            DbContext.SaveChanges();

            return _Response(res.Succeeded ? 202 : 403);
        }

        #endregion
    }
}
