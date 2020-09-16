using System.Threading.Tasks;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Sets;

namespace mLingoCore.Services
{
    /// <summary>
    /// Base definition of set manager functionality
    /// </summary>
    public interface ISetManager
    {
        ApiResponse Find(string id, string name, string range);

        ApiResponse CollectionsData(string id, string name);

        Task<ApiResponse> UserSets(string username);

        Task<ApiResponse> CreateSet(string username, CreateSetForm newSetData);

        ApiResponse DeleteSet(string id);

        Task<ApiResponse> EditSet(string id, string username, UpdateSetForm editedData);
    }
}
