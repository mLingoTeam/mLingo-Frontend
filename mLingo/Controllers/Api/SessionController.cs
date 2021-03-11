using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using mLingo.Extensions.Api;
using mLingo.Extensions.Authentication;
using mLingo.Models.Database;
using mLingo.Models.Database.User;
using mLingo.Modules;
using mLingoCore.Models.Forms.Session;
using mLingoCore.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mLingo.Controllers.Api
{
    [AuthorizeToken]
    [Route("api/session")]
    public class SessionController : Controller
    {
        private readonly ISessionManager _sessionManager;

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

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromQuery] string collectionId)
        {
            var res = await _sessionManager.Create(HttpContext.User.Identity.Name, collectionId);
            return this.HandleManagerResponse(res);
        }

        [HttpPost]
        [Route("submit")]
        public async Task<IActionResult> Submit([FromBody] SubmitSessionForm form)
        {
            var res = await _sessionManager.Submit(HttpContext.User.Identity.Name, form);
            return this.HandleManagerResponse(res);
        }
    }
}
