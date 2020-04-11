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
        ApiResponse Find(string id, string name);

        ApiResponse UserCollections(string username);

        Task<ApiResponse> Create(string username, CreateCollectionFormModel newCollectionData);

        Task<ApiResponse> Update(string id, string username, UpdateCollectionFormModel updatedCollection);

        Task<ApiResponse> DetectLanguage(string collectionId, string username);

        ApiResponse Delete(string id);
    }
}
