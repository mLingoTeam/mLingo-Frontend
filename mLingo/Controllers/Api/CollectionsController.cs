using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Api.ResponseModels.Collections;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.User;
using mLingoCore.Models.Forms.Collections;
using Newtonsoft.Json;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handle any action related with collections
    /// </summary>
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
        /// <summary>
        /// Default constructor for CollectionsController that injects all required dependencies
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="configuration"></param>
        /// <param name="appDbContext"></param>
        /// <param name="userManager"></param>
        public CollectionsController(ILogger<CollectionsController> logger, IConfiguration configuration, AppDbContext appDbContext, UserManager<AppUser> userManager)
        {
            _apiLogger = logger;
            _apiConfiguration = configuration;
            _apiDbContext = appDbContext;
            _apiUserManager = userManager;
        }

        #endregion

        #region Searching
        /// <summary>
        /// HTTP GET endpoint that finds collection either by its name or id.
        /// Id query returns full information about collection, including all the card data
        /// Name query returns overall collection data without cards about every collection with that name
        /// </summary>
        /// <param name="id">Optional id of collection to find</param>
        /// <param name="name">Optional name of collection to find</param>
        /// <returns>for id: <see cref="CollectionFullResponse"/> and for name: <see cref="CollectionOverviewResponse"/></returns>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Find(string id = null, string name = null)
        {
            if (!id.IsNullOrEmpty())
            {
                var collection = _apiDbContext.Collections.First(c => c.Id.Equals(id));
                if (collection == null) return BadRequest(new ApiResponse
                {
                    ErrorMessage = ErrorMessages.NoSuchCollection
                });

                var cards = collection.Cards
                    .Select(card => new CardResponse { CollectionId = card.CollectionId, Definition = card.Definition, Term = card.Term, Id = card.Id })
                    .ToList();

                var res = JsonConvert.SerializeObject(new ApiResponse<CollectionFullResponse>
                {
                    Response = new CollectionFullResponse
                    {
                        Id = collection.Id,
                        Name = collection.Name,
                        OwnerId = collection.OwnerId,
                        Cards = cards
                    }
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
                catch (ArgumentNullException)
                {
                    collections = new List<Collection>();
                }

                var colls = collections
                    .Select(c => new CollectionOverviewResponse { Id = c.Id, Name = c.Name, OwnerId = c.OwnerId })
                    .ToList();

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

        /// <summary>
        /// HTTP GET endpoint that returns information about all collections that specified user owns/>
        /// </summary>
        /// <param name="username">Username of user whose collections we want to fetch</param>
        /// <returns>List of <see cref="CollectionOverviewResponse"/></returns>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult UserCollections([FromQuery] string username)
        {
            var user = _apiDbContext.Users.FirstOrDefault(u => u.UserName.Equals(username));
            if (user == null) return BadRequest(new ApiResponse
            {
                ErrorMessage = ErrorMessages.UsernameNotFound
            });

            List<Collection> collections;
            try
            {
                collections = _apiDbContext.Collections.Where(c => c.OwnerId.Equals(user.Id)).ToList();
            }
            catch (ArgumentNullException)
            {
                collections = new List<Collection>();
            }

            if (collections.Count == 0) return NotFound(new ApiResponse
            {
                ErrorMessage = ErrorMessages.NoSuchCollection
            });

            var collectionsNormalized = collections
                .Select(c => new CollectionOverviewResponse { Id = c.Id, Name = c.Name, OwnerId = c.OwnerId })
                .ToList();

            var res = JsonConvert.SerializeObject(new ApiResponse<List<CollectionOverviewResponse>>
            {
                Response = collectionsNormalized
            });

            return Ok(res);
        }

        #endregion

        #region Manipulating

        /// <summary>
        /// HTTP POST endpoint that creates new collection in the database.
        /// This method automatically generates all ids and assigns owner id based on user token
        /// </summary>
        /// <param name="newCollectionData"><see cref="CreateCollectionFormModel"/></param>
        /// <returns>Http status code</returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCollectionFormModel newCollectionData)
        {
            // TODO: Think about cases when collection should be rejected

            var user = await _apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return Unauthorized();

            var colId = Guid.NewGuid().ToString();
            var collection = new Collection
            {
                Id = colId,
                Name = newCollectionData.Name,
                OwnerId = user.Id
            };

            var cards = newCollectionData.Cards.Select(c => new Card
            {
                Id = Guid.NewGuid().ToString(),
                Collection = collection,
                CollectionId = collection.Id,
                Term = c.Term,
                Definition = c.Definition
            })
                .ToList();

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

        /// <summary>
        /// HTTP PUT endpoint that updates collection data, add/removes cards etc.
        /// </summary>
        /// <param name="id">Id of collection to be updated</param>
        /// <param name="updatedCollection"><see cref="UpdateCollectionFormModel"/> with new collection data</param>
        /// <returns>Http response code</returns>
        [HttpPut]
        public async Task<IActionResult> Update([FromQuery] string id, [FromBody] UpdateCollectionFormModel updatedCollection)
        {
            // find collection to update
            var collectionToUpdate = _apiDbContext.Collections.First(c => c.Id.Equals(id));
            if (collectionToUpdate == null)
                return BadRequest(new ApiResponse
                {
                    ErrorMessage = ""
                });

            // check if user trying to update collection is its owner
            var user = await _apiUserManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return Unauthorized();
            var uid = user.Id;
            if (!uid.Equals(collectionToUpdate.OwnerId)) return Unauthorized();

            // update name
            collectionToUpdate.Name = updatedCollection.Name;

            // convert new and updated cards to database models
            var cardsToAdd = new List<Card>();
            var cardsToUpdate = new List<Card>();

            // normalize and sort updated cards
            foreach (var card in updatedCollection.Cards)
            {
                var normalizedCard = new Card(card)
                {
                    Collection = collectionToUpdate,
                    CollectionId = collectionToUpdate.Id
                };


                if (_apiDbContext.Cards.Contains(normalizedCard))
                {
                    if (_apiDbContext.Cards.First(c => c.Id.Equals(normalizedCard.Id)).IsUpdateNeeded(normalizedCard))
                        cardsToUpdate.Add(normalizedCard);
                }
                else
                {
                    cardsToAdd.Add(normalizedCard);
                }
            }

            // create list of cards to remove
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

        /// <summary>
        /// HTTP DELETE endpoint that cascade deletes collection from database
        /// </summary>
        /// <param name="id">Id of collection to delete</param>
        /// <returns>Http response code</returns>
        [HttpDelete]
        public IActionResult Delete([FromQuery] string id)
        {
            try
            {
                _apiDbContext.Collections.Remove(_apiDbContext.Collections.First(c => c.Id.Equals(id)));
                _apiDbContext.Cards.RemoveRange(_apiDbContext.Cards.Where(c => c.CollectionId.Equals(id)));
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

        #endregion
    }
}
