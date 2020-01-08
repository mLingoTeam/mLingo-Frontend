using System;
using System.Collections.Generic;
using System.Linq;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        public IActionResult Find(string id=null, string name=null)
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
        [AllowAnonymous]
        public IActionResult UserCollections([FromQuery] string username)
        {
            var user = _apiDbContext.Users.First(u => u.UserName.Equals(username));
            if(user == null) return BadRequest( new ApiResponse{
                ErrorMessage = ErrorMessages.UsernameNotFound
            });

            List<Collection> collections;
            try
            {
                collections = _apiDbContext.Collections.Where(c => c.OwnerFk.Equals(user.UserInfoFk)).ToList();
            }
            catch (ArgumentNullException)
            {
                collections = new List<Collection>();
            }

            return Ok(new ApiResponse<List<CollectionData>>
            {
                Response = collections.Data(_apiDbContext)
            });
        }

        [HttpPost]
        public IActionResult Create([FromBody] CollectionData newCollectionData)
        {
            // TODO: Think about cases when collection should be rejected
            try
            {
                _apiDbContext.Cards.AddRange(newCollectionData.Cards);
                _apiDbContext.Collections.Add(newCollectionData.Collection);
                _apiDbContext.SaveChanges();
            }
            catch
            {
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ""
                });
            }

            return Accepted();
        }

        [HttpPut]
        public IActionResult Update([FromQuery] string id, [FromBody] CollectionData updatedCollection)
        {
            var collectionToUpdate = _apiDbContext.Collections.First(c => c.Id.ToString().Equals(id));
            if (collectionToUpdate == null)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ""
                });

            collectionToUpdate.Name = updatedCollection.Collection.Name;

            try
            {
                _apiDbContext.Cards.RemoveRange(
                    _apiDbContext.Cards.Where(c => !updatedCollection.Cards.Any(cc => cc.Id.Equals(c.Id)))
                );

                _apiDbContext.Cards.AddRange(
                    updatedCollection.Cards.Where(c => !_apiDbContext.Cards.Any(cc => cc.Id.Equals(c.Id)))
                );

                _apiDbContext.SaveChanges();
            }
            catch
            {
                return StatusCode(500);
            }

            return Accepted();
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] string id)
        {
            var guid = new Guid(id);
            try
            {
                _apiDbContext.Collections.Remove(_apiDbContext.Collections.First(c => c.Id.Equals(guid)));
                _apiDbContext.Cards.RemoveRange(_apiDbContext.Cards.Where(c => c.CollectionFk.Equals(guid)));
            }
            catch
            {
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ""
                });
            }

            return Ok();
        }
    }
}
