using System.Collections.Generic;
using mLingoCore.Models.Api.Base;

namespace mLingoCore.Services
{
    /// <summary>
    /// Base definition of set manager functionality
    /// </summary>
    public interface ISetManager
    {
        KeyValuePair<ApiResponse, int> Find(string id, string name);

        KeyValuePair<ApiResponse, int> UserSets(string username);

        KeyValuePair<ApiResponse, int> CreateSet(string username, object newSetData);

        KeyValuePair<ApiResponse, int> DeleteSet(string id);

        KeyValuePair<ApiResponse, int> EditSet(string id, object editedData);

        KeyValuePair<ApiResponse, int> Add(string setId, string collectionId);

        KeyValuePair<ApiResponse, int> Remove(string setId, string collectionId);
    }
}
