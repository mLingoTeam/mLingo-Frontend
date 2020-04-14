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
        Task<ApiResponse> Register(RegisterForm form);

        Task<ApiResponse> Login(LoginForm form);

        Task<ApiResponse> Details(string username);

        Task<ApiResponse> DetailsById(string id);

        Task<ApiResponse> Delete(string username);

        Task<ApiResponse> EditInformation(string username, EditInformationForm form);

        Task<ApiResponse> RequestChangeToken(string username, string prop, EditMail form);

        Task<ApiResponse> ChangeEmail(string username, string token, EditMail form);

        Task<ApiResponse> ChangePassword(string username, ResetPasswordForm form);

        Task<ApiResponse> ResetPassword(string username, string token, ResetPasswordForm form);
    }
}
