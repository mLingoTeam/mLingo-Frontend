using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;

namespace mLingo.Controllers.Api
{
    [AuthorizeToken]
    public class CollectionsController : Controller
    {
        #region PrivateFields

        private readonly ILogger _apiLogger;

        private readonly IConfiguration _apiConfiguration;

        private readonly AppDbContext _apiDbContext;

        #endregion


        #region Constructor

        public CollectionsController(ILogger logger, IConfiguration configuration, AppDbContext appDbContext)
        {
            _apiLogger = logger;
            _apiConfiguration = configuration;
            _apiDbContext = appDbContext;
        }

        #endregion


        [HttpGet]
        public Task<IActionResult> GetCollection([FromQuery] string id)
        {
            
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
