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

        Task<KeyValuePair<ApiResponse, int>> Delete(string username);

        Task<KeyValuePair<ApiResponse, int>> EditInformation(string username, EditInformationForm form);

        Task<KeyValuePair<ApiResponse, int>> RequestChangeToken(string username, string prop, EditMailForm form);

        Task<KeyValuePair<ApiResponse, int>> ChangeEmail(string username, string token, EditMailForm form);

        Task<KeyValuePair<ApiResponse, int>> ChangePassword(string username, ResetPasswordForm form);

        Task<KeyValuePair<ApiResponse, int>> ResetPassword(string username, string token, ResetPasswordForm form);
    }
}
