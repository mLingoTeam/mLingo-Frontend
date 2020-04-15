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
        ApiResponse Find(string id, string name, string range);

        ApiResponse UserCollections(string username);

        Task<ApiResponse> Create(string username, CreateCollectionForm newCollectionData);

        Task<ApiResponse> Update(string id, string username, UpdateCollectionForm updatedCollection);

        Task<ApiResponse> DetectLanguage(string collectionId, string username);

        ApiResponse Delete(string id);
    }
}
