using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mLingoCore.Models.Forms.Collections;

namespace mLingoCore.Services
{
    public interface ICollectionManager
    {
        IActionResult Find(string id, string name);

        IActionResult UserCollections(string username);

        Task<IActionResult> Create(string username, CreateCollectionFormModel newCollectionData);

        Task<IActionResult> Update(string id, string username, UpdateCollectionFormModel updatedCollection);

        IActionResult Delete(string id);
    }
}
