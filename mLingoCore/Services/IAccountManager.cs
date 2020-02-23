using System.Collections.Generic;
using System.Threading.Tasks;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms;
using mLingoCore.Models.Forms.Accounts;

namespace mLingoCore.Services
{
    /// <summary>
    /// Base set of account related functionality 
    /// </summary>
    public interface IAccountManager
    {
        Task<KeyValuePair<ApiResponse, int>> Register(RegisterFormModel form);

        Task<KeyValuePair<ApiResponse, int>> Login(LoginFormModel form);

        Task<KeyValuePair<ApiResponse, int>> Details(string username);

        Task<KeyValuePair<ApiResponse, int>> Delete(string userId, string username);

        Task<KeyValuePair<ApiResponse, int>> EditInformation(string userId, string username, EditInformationForm form);

        Task<KeyValuePair<ApiResponse, int>> RequestChangeToken(string userId, string username, string prop, EditMailForm form);

        Task<KeyValuePair<ApiResponse, int>> ChangeEmail(string userId, string username, string token, EditMailForm form);

        Task<KeyValuePair<ApiResponse, int>> ChangePassword(string userId, string username, ResetPasswordForm form);

        Task<KeyValuePair<ApiResponse, int>> ResetPassword(string userId, string username, string token, ResetPasswordForm form);
    }
}
