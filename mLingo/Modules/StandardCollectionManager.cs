using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mLingoCore.Models.Forms.Collections;
using mLingoCore.Services;

namespace mLingo.Modules
{
    public class StandardCollectionManager : ICollectionManager
    {
        public IActionResult Find(string id, string name)
        {
            throw new System.NotImplementedException();
        }

        public IActionResult UserCollections(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<IActionResult> Create(string username, CreateCollectionFormModel newCollectionData)
        {
            throw new System.NotImplementedException();
        }

        public Task<IActionResult> Update(string id, string username, UpdateCollectionFormModel updatedCollection)
        {
            throw new System.NotImplementedException();
        }

        public IActionResult Delete(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}
