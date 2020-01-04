using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mLingo.Extensions.Authentication;

namespace mLingo.Controllers.Api
{
    [AuthorizeToken]
    public class CollectionsController : Controller
    {
        [HttpGet]
        public Task<IActionResult> GetCollection([FromQuery] string id)
        {
            return null;
        }

        [HttpGet]
        public Task<IActionResult> GetUserCollections([FromQuery] string username)
        {
            return null;
        }

        [HttpPost]
        public Task<IActionResult> CreateCollection([FromBody] object newCollectionData)
        {
            return null;
        }

        [HttpPut]
        public Task<IActionResult> UpdateCollection([FromQuery] string id)
        {
            return null;
        }

        [HttpDelete]
        public Task<IActionResult> DeleteCollection([FromQuery] string id)
        {
            return null;
        }

    }
}
