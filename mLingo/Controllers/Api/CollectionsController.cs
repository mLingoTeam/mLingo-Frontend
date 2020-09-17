using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mLingo.Extensions.Api;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingo.Modules;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Collections;
using mLingoCore.Services;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handle any action related with collections
    /// </summary>
    [AuthorizeToken]
    [Route("api/collections")]
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
        /// <param name="langDetector"></param>
        /// <param name="appDbContext"></param>
        /// <param name="userManager"></param>
        /// <param name="cManager"></param>
        public CollectionsController(
            ILogger<CollectionsController> logger,
            AppDbContext appDbContext, 
            UserManager<AppUser> userManager,
            ICollectionManager cManager,
            ILanguageDetector langDetector)
        {
            var cm = (StandardCollectionManager) cManager;
            cm.DbContext = appDbContext;
            cm.UserManager = userManager;
            cm.LanguageDetector = langDetector;
            _collectionManager = cm;
            _apiLogger = logger;
        }

        #endregion

        #region Searching
        /// <summary>
        /// Finds collection either by its name or id.
        /// </summary>
        /// <param name="id">Optional id of collection to find</param>
        /// <param name="name">Optional name of collection to find</param>
        /// <param name="range">Optional range of elements to get</param>
        /// <response code="200">Successful returns collection data</response>
        /// <response code="400">Incorrect parameters</response>
        /// <response code="404">Collection not found</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("find")]
        public IActionResult Find([FromQuery] string id = null, [FromQuery] string name = null, [FromQuery] string range = null)
        {
            var res = _collectionManager.Find(id, name, range);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Returns information about all collections that specified user owns
        /// </summary>
        /// <param name="username">Username of user whose collections we want to fetch</param>
        /// <response code="200">Successful, returns list of user collections</response>
        /// <response code="404">User not found or user has no collections, check <see cref="ErrorRapport"/> for details</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("usercollections")]
        public IActionResult UserCollections([FromQuery] string username)
        {
            var res = _collectionManager.UserCollections(username);
            return this.HandleManagerResponse(res);
        }

        #endregion

        #region Manipulating

        /// <summary>
        /// Creates new collection 
        /// This method automatically generates all ids and assigns owner id based on user token
        /// </summary>
        /// <param name="newCollectionData"><see cref="CreateCollectionForm"/></param>
        /// <response code="200">Successful, collection created</response>
        /// <response code="400">Authorization issues, should not ever happen</response>
        /// <response code="500">Creation failed, server fault. Check <see cref="ErrorRapport"/> for details</response>
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateCollectionForm newCollectionData)
        {
            var res = await _collectionManager.Create(HttpContext.User.Identity.Name, newCollectionData);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Updates collection data, add/removes cards etc.
        /// </summary>
        /// <param name="id">Id of collection to be updated</param>
        /// <param name="updatedCollection"><see cref="UpdateCollectionForm"/> with new collection data</param>
        /// <response code="200">Successful, collection updated</response>
        /// <response code="400">Authorization issues, should not ever happen</response>
        /// <response code="401">User trying to update collection is not its owner</response>
        /// <response code="404">Collection does not exist</response>
        /// <response code="500">Failed to create collection, server fault. Check <see cref="ErrorRapport"/> for details.</response>
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update([FromQuery] string id, [FromBody] UpdateCollectionForm updatedCollection)
        {
            var res = await _collectionManager.Update(id, HttpContext.User.Identity.Name, updatedCollection);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Deletes collection from database
        /// </summary>
        /// <param name="id">Id of collection to delete</param>
        /// <response code="200">Successful, collection deleted</response>
        /// <response code="500">Failed to delete collection, server fault. Check <see cref="ErrorRapport"/> for details.</response>
        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete([FromQuery] string id)
        {
            var res = _collectionManager.Delete(id);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Detects collection languages with <see cref="ILanguageDetector"/> and updates collection information
        /// </summary>
        /// <param name="collectionId"></param>
        /// <response code="200">Successful, language detected, collection updated</response>
        /// <response code="404">Collection not found</response>
        /// <response code="500">Failed to detect language, server fault. Check <see cref="ErrorRapport"/> for details.</response>
        [HttpPut]
        [Route("detectlanguage")]
        public async Task<IActionResult> DetectLanguage([FromQuery] string collectionId)
        {
            var res = await _collectionManager.DetectLanguage(collectionId, HttpContext.User.Identity.Name);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Imports cards from one existing collection to another. All cards are copied and given new ids.
        /// </summary>
        /// <param name="importId">Collection to import cards from</param>
        /// <param name="targetId">Collection to import cards into</param>
        /// <response code="200">Ok, cards imported into target collection</response>
        /// <response code="404">Either target or import collection does not exist</response>
        /// <response code="401">Unauthorized attempt, should not happen ever</response>
        [HttpPut]
        [Route("import")]
        public async Task<IActionResult> Import([FromQuery] string importId, [FromQuery] string targetId)
        {
            var res = await _collectionManager.Import(importId, targetId, HttpContext.User.Identity.Name);
            return this.HandleManagerResponse(res);
        }

        #endregion
    }
}
