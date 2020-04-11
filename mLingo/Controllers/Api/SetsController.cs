using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using mLingo.Extensions.Api;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingo.Modules;
using mLingoCore.Models.Forms.Sets;
using mLingoCore.Services;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handles any action related to sets
    /// </summary>
    [AuthorizeToken]
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
        /// <remarks>
        /// {
        ///     "Id": null,
        ///     "Name": "TestSet",
        ///     "CollectionIds": [
        ///         "182bd798-64b1-404f-b52f-63dc7163eaf2",
        ///         "582bdas8-64b1-404f-b5sd-63dc7163eaf2",
        ///         "122bd798-63b1-404f-b52f-64356163eaf2"
        ///     ]
        /// }
        /// </remarks>
        /// <param name="setInfo">Information about set from request body</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Create([FromBody] CreateSetForm setInfo)
        {
            var res = _setManager.CreateSet(HttpContext.User.Identity.Name, setInfo);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Deletes set
        /// </summary>
        /// <param name="id">Id of set to delete</param>
        /// <returns></returns>
        [HttpDelete]
        public IActionResult Delete(string id)
        {
            var res = _setManager.DeleteSet(id);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Adds existing collection to existing set
        /// </summary>
        /// <param name="setId">Target set id</param>
        /// <param name="collectionId">Target collection id</param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Add(string setId, string collectionId)
        {
            var res = _setManager.Add(setId, collectionId);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Removes existing collection from existing set
        /// </summary>
        /// <param name="setId">Target set id</param>
        /// <param name="collectionId">Target collection id</param>
        /// <returns></returns>
        [HttpDelete]
        public IActionResult Remove(string setId, string collectionId)
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
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Find(string id = null, string name = null)
        {
            var res = _setManager.Find(id, name);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Returns overview of all sets owned by specified user
        /// </summary>
        /// <param name="username">Name of user whom sets you want to retrieve</param>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> UserSets(string username)
        {
            var res = await _setManager.UserSets(username);
            return this.HandleManagerResponse(res);
        }

        #endregion
    }
}
