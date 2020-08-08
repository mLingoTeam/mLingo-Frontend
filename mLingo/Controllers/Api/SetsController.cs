using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using mLingo.Extensions.Api;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingo.Modules;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Sets;
using mLingoCore.Services;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handles any action related to sets
    /// </summary>
    [AuthorizeToken]
    [Route("api/sets")]
    public class SetsController : Controller
    {
        #region PrivateFields

        private readonly ISetManager _setManager;

        private readonly AppDbContext _dbContext;

        private readonly UserManager<AppUser> _userManager;

        #endregion

        #region Constructor
        /// <summary>
        /// Default constructor that injects all required dependencies
        /// </summary>
        /// <param name="setManager">Set manager implementation</param>
        /// <param name="dbContext">Application database context</param>
        /// <param name="userManager">User manager implementation</param>
        public SetsController(ISetManager setManager, AppDbContext dbContext, UserManager<AppUser> userManager)
        {
            var sm = (StandardSetManager)setManager;
            sm.DbContext = dbContext;
            sm.UserManager = userManager;
            _setManager = sm;
            _dbContext = dbContext;
            _userManager = userManager;
        }

        #endregion

        #region Manipulating

        /// <summary>
        /// Creates set based on submitted form
        /// </summary>
        /// <param name="setInfo">Information about set from request body</param>
        /// <response code="200">Successful, set created</response>
        /// <response code="500">Set creation failed, server fault. Check <see cref="ErrorRapport"/> for details.</response>
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateSetForm setInfo)
        {
            var res = await _setManager.CreateSet(HttpContext.User.Identity.Name, setInfo);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Deletes set
        /// </summary>
        /// <param name="id">Id of set to delete</param>
        /// <response code="200">Successful, set deleted</response>
        /// <response code="500">Set deletion failed, server fault. Check <see cref="ErrorRapport"/> for details.</response>
        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete([FromQuery] string id)
        {
            var res = _setManager.DeleteSet(id);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Adds existing collection to existing set
        /// </summary>
        /// <param name="setId">Target set id</param>
        /// <param name="collectionId">Target collection id</param>
        /// <response code="200">Successful, collection added to the set</response>
        /// <response code="400">Failed to add collection to set (collection or set is null)</response>
        /// <response code="500">Failed to add collection to set, server fault. Please check <see cref="ErrorRapport"/> for details.</response>
        [HttpPut]
        [Route("add")]
        public IActionResult Add([FromQuery] string setId, [FromQuery] string collectionId)
        {
            var res = _setManager.Add(setId, collectionId);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Removes existing collection from existing set
        /// </summary>
        /// <param name="setId">Target set id</param>
        /// <param name="collectionId">Target collection id</param>
        /// <response code="200">Successful, collection removed from set</response>
        /// <response code="400">Failed to remove collection from set (there is no such collection in the set)</response>
        /// <response code="500">Failed to remove collection from set, server fault. Please check <see cref="ErrorRapport"/> for details.</response>
        [HttpDelete]
        [Route("remove")]
        public IActionResult Remove([FromQuery] string setId, [FromQuery] string collectionId)
        {
            var res = _setManager.Remove(setId, collectionId);
            return this.HandleManagerResponse(res);
        }

        #endregion

        #region Searching

        /// <summary>
        /// Finds set based on its id or name
        /// Note: one and only one parameter should be specified
        /// Note: id returns all information about set, name returns only overview and can return multiple sets
        /// </summary>
        /// <param name="id">Id of the set to find</param>
        /// <param name="name">Name of the set(s) to find</param>
        /// <param name="range">Range of elements to retrieve from query</param>
        /// <response code="200">Successful, returns set information</response>
        /// <response code="400">Invalid query</response>
        /// <response code="404">Set does not exist</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("find")]
        public IActionResult Find([FromQuery] string id = null, [FromQuery] string name = null, [FromQuery] string range = null)
        {
            var res = _setManager.Find(id, name, range);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Returns overview of all sets owned by specified user
        /// </summary>
        /// <param name="username">Name of user whom sets you want to retrieve</param>
        /// <response code="200">Successful, returns set information</response>
        /// <response code="404">Set/user does not exist. Check <see cref="ErrorRapport"/> for details.</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("usersets")]
        public async Task<IActionResult> UserSets([FromQuery] string username)
        {
            var res = await _setManager.UserSets(username);
            return this.HandleManagerResponse(res);
        }

        public IActionResult CollectionsData([FromQuery] string id = null, [FromQuery] string name = null)
        {
            var res = _setManager.CollectionsData(id, name);
            return this.HandleManagerResponse(res);
        }
        #endregion
    }
}
