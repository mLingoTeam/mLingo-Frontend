using System.Threading.Tasks;
using Castle.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms;
using mLingoCore.Models.Forms.Accounts;

namespace mLingo.Modules.Interfaces
{
    public interface IAccountManager
    {
        Task<Pair<ApiResponse, int>> Register(RegisterFormModel form, UserManager<AppUser> userManager, IConfiguration configuration);

        Task<Pair<ApiResponse, int>> Login(LoginFormModel form, UserManager<AppUser> userManager, IConfiguration configuration);

        Task<Pair<ApiResponse, int>> Details(UserManager<AppUser> userManager, string username);

        Task<Pair<ApiResponse, int>> Delete(string userId, string username, UserManager<AppUser> userManager);

        Task<Pair<ApiResponse, int>> EditInformation(string userId, string username, EditInformationForm form, UserManager<AppUser> userManager,
            AppDbContext dbContext);

        Task<Pair<ApiResponse, int>> RequestChangeToken(string userId, string username, string prop, EditMailForm form,
            UserManager<AppUser> userManager);

        Task<Pair<ApiResponse, int>> ChangeEmail(string userId, string username, string token, EditMailForm form,
            UserManager<AppUser> userManager, AppDbContext dbContext);

        Task<Pair<ApiResponse, int>> ChangePassword(string userId, string username, ResetPasswordForm form, UserManager<AppUser> userManager,
            AppDbContext dbContext);

        Task<Pair<ApiResponse, int>> ResetPassword(string userId, string username, string token, ResetPasswordForm form,
            UserManager<AppUser> userManager, AppDbContext dbContext);
    }
}
