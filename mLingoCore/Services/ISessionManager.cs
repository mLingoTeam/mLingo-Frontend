using System.Threading.Tasks;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Session;

namespace mLingoCore.Services
{
    interface ISessionManager
    {
        Task<ApiResponse> Create(string username, string collectionId);
        
        Task<ApiResponse> Submit(SubmitSessionForm form);
    }
}
