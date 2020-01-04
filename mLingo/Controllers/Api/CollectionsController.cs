using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Authentication;
using mLingo.Extensions.Collections;
using mLingo.Models.Database;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.FlashCards;

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
        public IActionResult GetCollection(string id=null, string name=null)
        {
            if (!id.IsNullOrEmpty())
            {
                var collection = _apiDbContext.Collections.First(c => c.Id.ToString().Equals(id));
                if (collection == null) return BadRequest(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.NoSuchCollection
                });

                return Ok(new ApiResponse<CollectionData>
                {
                    Response = collection.Data(_apiDbContext)
                });
            }
            
            if (!name.IsNullOrEmpty())
            {
                List<Collection> collections;
                try
                { 
                    collections = _apiDbContext.Collections.Where(c => c.Name.Equals(name)).ToList();
                }
                catch(ArgumentNullException)
                {
                    collections = new List<Collection>();
                }

                return Ok(new ApiResponse<List<Collection>>
                {
                    Response = collections
                });
            }

            return BadRequest(new ApiResponse
            {
                ErrorMessage = ErrorMessages.InvalidQuery
            });
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
