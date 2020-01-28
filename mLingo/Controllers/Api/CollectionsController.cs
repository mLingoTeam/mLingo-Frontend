using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Authentication;
using mLingo.Extensions.Collections;
using mLingo.Models.Database;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Api.ResponseModels;
using mLingoCore.Models.Api.ResponseModels.Collections;
using mLingoCore.Models.FlashCards;
using mLingoCore.Models.Forms.Collections;
using Newtonsoft.Json;

namespace mLingo.Controllers.Api
{
    [AuthorizeToken]
    public class CollectionsController : Controller
    {
        #region PrivateFields

        private readonly ILogger _apiLogger;

        private readonly IConfiguration _apiConfiguration;

        private readonly AppDbContext _apiDbContext;

        private readonly UserManager<AppUser> _apiUserManager;

        #endregion


        #region Constructor

        public CollectionsController(ILogger<CollectionsController> logger, IConfiguration configuration, AppDbContext appDbContext, UserManager<AppUser> userManager)
        {
            _apiLogger = logger;
            _apiConfiguration = configuration;
            _apiDbContext = appDbContext;
            _apiUserManager = userManager;
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

                var res = JsonConvert.SerializeObject(new ApiResponse<CollectionFullResponse>
                {
                    Response = new CollectionFullResponse(collection.Data(_apiDbContext))
                });
                return Ok(res);
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

                var colls = new List<CollectionOverviewResponse>();
                foreach(var c in collections) colls.Add(new CollectionOverviewResponse(c));

                var res = JsonConvert.SerializeObject(new ApiResponse<List<CollectionOverviewResponse>>
                {
                    Response = colls
                });

                return Ok(res);
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
            var user = _apiDbContext.Users.FirstOrDefault(u => u.UserName.Equals(username));
            if(user == null) return BadRequest( new ApiResponse{
                ErrorMessage = ErrorMessages.UsernameNotFound
            });

            List<Collection> collections;
            try
            {
                collections = _apiDbContext.Collections.Where(c => c.OwnerId.Equals(user.UserInfoFk)).ToList();
            }
            catch (ArgumentNullException)
            {
                collections = new List<Collection>();
            }

            if (collections.Count == 0) return NotFound(new ApiResponse
            {
                ErrorMessage = ErrorMessages.NoSuchCollection
            });

            var collectionsNormalized = new List<CollectionOverviewResponse>();
            foreach (var c in collections) collectionsNormalized.Add(new CollectionOverviewResponse(c));

            var res = JsonConvert.SerializeObject(new ApiResponse<List<CollectionOverviewResponse>>
            {
                Response = collectionsNormalized
            });

            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCollectionFormModel newCollectionData)
        {
            // TODO: Think about cases when collection should be rejected

            var user = await _apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            var uid = new Guid(user.Id);

            var colId = Guid.NewGuid();
            var collection = new Collection
            {
                Id = colId,
                Name = newCollectionData.Name,
                OwnerId = uid
            };

            var cards = new List<Card>();
            foreach(var c in newCollectionData.Cards) cards.Add(new Card
            {
                Id = Guid.NewGuid(),
                Collection = collection,
                CollectionId = collection.Id,
                Term = c.Term,
                Definition = c.Definition
            });

            try
            {
                _apiDbContext.Collections.Add(collection);
                _apiDbContext.Cards.AddRange(cards);
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
        public async Task<IActionResult> Update([FromQuery] string id, [FromBody] UpdateCollectionFormModel updatedCollection)
        {
            // find collection to update
            var collectionToUpdate = _apiDbContext.Collections.First(c => c.Id.Equals(new Guid(id)));
            if (collectionToUpdate == null)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ""
                });

            // check if user trying to update collection is its owner
            var user = await _apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            var uid = new Guid(user.Id);
            if (!uid.Equals(collectionToUpdate.OwnerId)) return Unauthorized();

            // update name
            collectionToUpdate.Name = updatedCollection.Name;

            // convert new and updated cards to database models
            var cardsToAdd = new List<Card>();
            var cardsToUpdate = new List<Card>();

            foreach (var card in updatedCollection.Cards)
            {
                var normalizedCard = new Card(card, collectionToUpdate);
                //if (!_apiDbContext.Cards.Any(c => c.Id.Equals(card.Id)))
                
                    
                if(_apiDbContext.Cards.Contains(normalizedCard))
                {
                    if(_apiDbContext.Cards.First(c => c.Id.Equals(normalizedCard.Id)).IsUpdateNeeded(normalizedCard))
                        cardsToUpdate.Add(normalizedCard);
                }
                else
                {
                    cardsToAdd.Add(normalizedCard);
                }
            }

            var cardsToRemove = _apiDbContext.Cards
                .Where(c => c.CollectionId.Equals(collectionToUpdate.Id)).ToList()
                .Where(card => !cardsToAdd.Any(cc => cc.Id.Equals(card.Id)) && !cardsToUpdate.Any(cc => cc.Id.Equals(card.Id)))
                .ToList();

            // add, update and remove cards
            try
            {
                _apiDbContext.Cards.RemoveRange(cardsToRemove);

                _apiDbContext.Cards.AddRange(cardsToAdd);

                foreach (var updated in cardsToUpdate)
                {
                    var card = _apiDbContext.Cards.First(c => c.Id.Equals(updated.Id));
                    card.Term = updated.Term;
                    card.Definition = updated.Definition;
                }

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
                _apiDbContext.Cards.RemoveRange(_apiDbContext.Cards.Where(c => c.CollectionId.Equals(guid)));
                _apiDbContext.SaveChanges();
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
