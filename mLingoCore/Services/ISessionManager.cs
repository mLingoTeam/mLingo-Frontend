using System.Threading.Tasks;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Session;

namespace mLingoCore.Services
{
    public interface ISessionManager
    {
        Task<ApiResponse> Create(string username, string collectionId);
        
        Task<ApiResponse> Submit(string username, SubmitSessionForm form);
    }
}
