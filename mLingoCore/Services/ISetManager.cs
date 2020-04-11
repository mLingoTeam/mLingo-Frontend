using System.Collections.Generic;
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
        ApiResponse Find(string id, string name);

        Task<ApiResponse> UserSets(string username);

        ApiResponse CreateSet(string username, CreateSetForm newSetData);

        ApiResponse DeleteSet(string id);

        ApiResponse EditSet(string id, object editedData);

        ApiResponse Add(string setId, string collectionId);

        ApiResponse Remove(string setId, string collectionId);
    }
}
