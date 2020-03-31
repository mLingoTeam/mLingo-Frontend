using System.Collections.Generic;
using System.Threading.Tasks;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Collections;

namespace mLingoCore.Services
{
    /// <summary>
    /// Base definition of collection manager functionality
    /// </summary>
    public interface ICollectionManager
    {
        KeyValuePair<ApiResponse, int> Find(string id, string name);

        KeyValuePair<ApiResponse, int> UserCollections(string username);

        Task<KeyValuePair<ApiResponse, int>> Create(string username, CreateCollectionFormModel newCollectionData);

        Task<KeyValuePair<ApiResponse, int>> Update(string id, string username, UpdateCollectionFormModel updatedCollection);

        Task<KeyValuePair<ApiResponse, int>> DetectLanguage(string collectionId, string username);

        KeyValuePair<ApiResponse, int> Delete(string id);
    }
}
