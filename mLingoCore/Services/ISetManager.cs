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
        KeyValuePair<ApiResponse, int> Find(string id, string name);

        Task<KeyValuePair<ApiResponse, int>> UserSets(string username);

        KeyValuePair<ApiResponse, int> CreateSet(string username, CreateSetForm newSetData);

        KeyValuePair<ApiResponse, int> DeleteSet(string id);

        KeyValuePair<ApiResponse, int> EditSet(string id, object editedData);

        KeyValuePair<ApiResponse, int> Add(string setId, string collectionId);

        KeyValuePair<ApiResponse, int> Remove(string setId, string collectionId);
    }
}
