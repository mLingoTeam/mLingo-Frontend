using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Api;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingoCore.Models.Api.ResponseModels.Collections;
using mLingo.Models.Database.User;
using mLingo.Modules;
using mLingoCore.Models.Forms.Collections;
using mLingoCore.Services;

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

        private readonly ICollectionManager _collectionManager;

        #endregion

        #region Constructor
        /// <summary>
        /// Default constructor for CollectionsController that injects all required dependencies
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="configuration"></param>
        /// <param name="appDbContext"></param>
        /// <param name="userManager"></param>
        public CollectionsController(
            ILogger<CollectionsController> logger,
            AppDbContext appDbContext, 
            UserManager<AppUser> userManager,
            ICollectionManager cManager)
        {
            var cm = (StandardCollectionManager) cManager;
            cm.DbContext = appDbContext;
            cm.UserManager = userManager;
            _collectionManager = cm;
            _apiLogger = logger;
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
            var res = _collectionManager.Find(id, name);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// HTTP GET endpoint that returns information about all collections that specified user owns/>
        /// </summary>
        /// <param name="username">Username of user whose collections we want to fetch</param>
        /// <returns>List of <see cref="CollectionOverviewResponse"/></returns>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult UserCollections(string username)
        {
            var res = _collectionManager.UserCollections(username);
            return this.HandleManagerResponse(res);
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
            var res = await _collectionManager.Create(HttpContext.User.Identity.Name, newCollectionData);
            return this.HandleManagerResponse(res);
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
            var res = await _collectionManager.Update(id, HttpContext.User.Identity.Name, updatedCollection);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// HTTP DELETE endpoint that cascade deletes collection from database
        /// </summary>
        /// <param name="id">Id of collection to delete</param>
        /// <returns>Http response code</returns>
        [HttpDelete]
        public IActionResult Delete([FromQuery] string id)
        {
            var res = _collectionManager.Delete(id);
            return this.HandleManagerResponse(res);
        }

        #endregion
    }
}
