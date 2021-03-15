using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using mLingo.Extensions.Api;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingo.Modules;
using mLingoCore.Models.Forms.Session;
using mLingoCore.Services;
using System.Threading.Tasks;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handles any action related to learning sessions
    /// </summary>
    [AuthorizeToken]
    [Route("api/session")]
    public class SessionController : Controller
    {
        #region PrivateFields
        private readonly ISessionManager _sessionManager;
        #endregion

        #region Constructor
        public SessionController(
            UserManager<AppUser> userManager, 
            ISessionManager sessionManager, 
            AppDbContext appDbContext)
        {
            var sm = (StandardSessionManager)sessionManager;
            sm.DbContext = appDbContext;
            sm.UserManager = userManager;
            _sessionManager = sm;
        }
        #endregion

        #region Implementation

        /// <summary>
        /// Registers learning session on user of context with collection of given ID
        /// </summary>
        /// <param name="collectionId">Id of collection to learn from passed as query param</param>
        /// <response code="200">Session successfully created - returns session overview containing its ID</response>
        /// <response code="503">Failed to create session due to db error</response>
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromQuery] string collectionId)
        {
            var res = await _sessionManager.Create(HttpContext.User.Identity.Name, collectionId);
            return this.HandleManagerResponse(res);
        }

        /// <summary>
        /// Submits session as finished
        /// </summary>
        /// <param name="form">Session data</param>
        /// <response code="200">Session successfully completed, returns Session Data as response body</response>
        /// <response code="503">Failed to submit session due to db error</response>
        [HttpPost]
        [Route("submit")]
        public async Task<IActionResult> Submit([FromBody] SubmitSessionForm form)
        {
            var res = await _sessionManager.Submit(HttpContext.User.Identity.Name, form);
            return this.HandleManagerResponse(res);
        }
        #endregion
    }
}
