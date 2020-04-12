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
        /// <returns>for id: <see cref="CollectionFullResponse"/> and for name: <see cref="CollectionOverviewResponse"/></returns>
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
        /// <returns>List of <see cref="CollectionOverviewResponse"/></returns>
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
        /// <remarks>
        /// {
        ///     "Name": "example",
        ///     "Cards": [
        ///         {
        ///             "Term": "example1",
        ///             "Definition": "example1"
        ///         },
        ///         {
        ///             "Term": "example2",
        ///             "Definition": "example2"
        ///         }
        ///     ]
        /// }
        /// </remarks>
        /// <param name="newCollectionData"><see cref="CreateCollectionFormModel"/></param>
        /// <returns>Http status code</returns>
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateCollectionFormModel newCollectionData)
        {
            var res = await _collectionManager.Create(HttpContext.User.Identity.Name, newCollectionData);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Updates collection data, add/removes cards etc.
        /// </summary>
        /// <remarks>
        /// {
        ///     "Name": "updated_collection_name",
        ///     "BaseLanguage": "language_code_ISO639_2T",
        ///     "SecondLanguage": "language_code_ISO639_2T",
        ///     "Cards": [
        ///         {
        ///             "Id": "182bd798-64b1-404f-b52f-63dc7163eaf2",
        ///             "Term": "updated_term",
        ///             "Definition": "updated_definition",
        ///             "CollectionId": "182bd798-64b1-404f-b52f-63dc7163eaf2"
        ///         },
        ///         {
        ///             "Id": null,
        ///             "Term": "new_term",
        ///             "Definition": "new_definition",
        ///             "CollectionId": "182bd798-64b1-404f-b52f-63dc7163eaf2"
        ///         },
        ///         {
        ///             "Id": "182bd798-64b1-404f-b52f-63dc7163eaf2",
        ///             "Term": "unchanged_term",
        ///             "Definition": "unchanged_definition",
        ///             "CollectionId": "182bd798-64b1-404f-b52f-63dc7163eaf2"
        ///         }
        ///     ]
        /// }
        /// </remarks>
        /// <param name="id">Id of collection to be updated</param>
        /// <param name="updatedCollection"><see cref="UpdateCollectionFormModel"/> with new collection data</param>
        /// <returns>Http response code</returns>
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update([FromQuery] string id, [FromBody] UpdateCollectionFormModel updatedCollection)
        {
            var res = await _collectionManager.Update(id, HttpContext.User.Identity.Name, updatedCollection);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Deletes collection from database
        /// </summary>
        /// <param name="id">Id of collection to delete</param>
        /// <returns>Http response code</returns>
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
        /// <returns>Http response code</returns>
        [HttpPut]
        [Route("detectlanguage")]
        public async Task<IActionResult> DetectLanguage([FromQuery] string collectionId)
        {
            var res = await _collectionManager.DetectLanguage(collectionId, HttpContext.User.Identity.Name);
            return this.HandleManagerResponse(res);
        }

        #endregion
    }
}
