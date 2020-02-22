using System;
using System.Threading.Tasks;
using Castle.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingo.Modules.Interfaces;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms;
using mLingoCore.Models.Forms.Accounts;

namespace mLingo.Modules.Implementations
{
    public class StandardAccountManager : IAccountManager
    {
        
        private Pair<ApiResponse, int> _Response(ApiResponse res, int statusCode) => new Pair<ApiResponse, int>(res, statusCode);
        private Pair<ApiResponse, int> _Response(int statusCode) => new Pair<ApiResponse, int>(null, statusCode);

        public async Task<Pair<ApiResponse, int>> Register(RegisterFormModel form, UserManager<AppUser> userManager, IConfiguration configuration)
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

            var result = await userManager.CreateAsync(user, form.Password);

            if (!result.Succeeded)
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidRegistration
                }, 403);


            var userIdentity = await userManager.FindByNameAsync(user.UserName);

            return _Response(new ApiResponse
            {
                Response = userIdentity.Credentials(userIdentity.GenerateJwtToken(configuration))
            }, 200);

        }

        public async Task<Pair<ApiResponse, int>> Login(LoginFormModel form, UserManager<AppUser> userManager, IConfiguration configuration)
        {
            if (form == null || LoginFormModel.ValidateForm(form) == false)
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidLogin
                }, 403);

            var isEmail = form.UserId.Contains("@");

            var user = isEmail
                ? await userManager.FindByEmailAsync(form.UserId)
                : await userManager.FindByNameAsync(form.UserId);

            if (user == null)
                return _Response(new ApiResponse
                {
                    ErrorMessage = isEmail ? ErrorMessages.UserEmailNotFound : ErrorMessages.UsernameNotFound
                }, 404);

            var isPasswordOk = await userManager.CheckPasswordAsync(user, form.Password);

            if (!isPasswordOk)
                return _Response(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.InvalidLogin
                }, 403);

            return _Response(new ApiResponse
            {
                Response = user.Credentials(user.GenerateJwtToken(configuration))
            }, 200);
        }

        public async Task<Pair<ApiResponse, int>> Details(UserManager<AppUser> userManager, string username)
        {
            var user = await userManager.FindByNameAsync(username);

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

        public async Task<Pair<ApiResponse, int>> Delete(string userId, string username, UserManager<AppUser> userManager)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return _Response(401);
            if (user.Id != userId) return _Response(401);
            var res = await userManager.DeleteAsync(user);
            return res.Succeeded ? _Response(200) : _Response(null, 404);
        }

        public async Task<Pair<ApiResponse, int>> EditInformation(string userId, string username, EditInformationForm form, UserManager<AppUser> userManager,
            AppDbContext dbContext)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return _Response(404);
            if (user.Id != userId) return _Response(401);

            try
            {
                if (form.LastName != null) user.UserInformation.LastName = form.LastName;
                if (form.FirstName != null) user.UserInformation.FirstName = form.FirstName;
                if (form.DateOfBirth != null)
                {
                    user.UserInformation.DateOfBirth = form.DateOfBirth;
                    user.UserInformation.Age = DateTime.Today.Year - DateTime.Parse(form.DateOfBirth).Year;
                }

                dbContext.SaveChanges();
                return _Response(200);
            }
            catch
            {
                return _Response(500);
            }
        }

        public async Task<Pair<ApiResponse, int>> RequestChangeToken(string userId, string username, string prop, EditMailForm form,
            UserManager<AppUser> userManager)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return _Response(404);
            if (user.Id != userId) return _Response(401);

            if (prop == null)
                return _Response(new ApiResponse
                {
                    ErrorMessage = "Invalid prop"
                }, 403);

            var token = prop switch
            {
                "email" => form != null
                    ? await userManager.GenerateChangeEmailTokenAsync(user, form.Email)
                    : "No email",
                "password" => await userManager.GeneratePasswordResetTokenAsync(user),
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

        public async Task<Pair<ApiResponse, int>> ChangeEmail(string userId, string username, string token, EditMailForm form,
            UserManager<AppUser> userManager, AppDbContext dbContext)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return _Response(404);
            if (user.Id != userId) return _Response(401);

            var res = await userManager.ChangeEmailAsync(user, form.Email, token);
            dbContext.SaveChanges();

            return _Response(res.Succeeded ? 202 : 403);
        }

        public async Task<Pair<ApiResponse, int>> ChangePassword(string userId, string username, ResetPasswordForm form, UserManager<AppUser> userManager,
            AppDbContext dbContext)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return _Response(404);
            if (user.Id != userId) return _Response(401);

            var res = await userManager.ChangePasswordAsync(user, form.OldPassword, form.NewPassword);
            dbContext.SaveChanges();

            return _Response(res.Succeeded ? 202 : 403);
        }

        public async Task<Pair<ApiResponse, int>> ResetPassword(string userId, string username, string token, ResetPasswordForm form,
            UserManager<AppUser> userManager, AppDbContext dbContext)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return _Response(404);
            if (user.Id != userId) return _Response(401);

            var res = await userManager.ResetPasswordAsync(user, token, form.NewPassword);
            dbContext.SaveChanges();

            return _Response(res.Succeeded ? 202 : 403);
        }
    }
}
