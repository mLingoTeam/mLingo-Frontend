using System.Threading.Tasks;
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
    [AuthorizeToken]
    public class SetsController : Controller
    {

        private readonly ISetManager _setManager;

        private readonly AppDbContext _dbContext;

        private readonly UserManager<AppUser> _userManager;

        public SetsController(ISetManager setManager, AppDbContext dbContext, UserManager<AppUser> userManager)
        {
            var sm = (StandardSetManager) setManager;
            sm.DbContext = dbContext;
            sm.UserManager = userManager;
            _setManager = sm;
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public IActionResult Create([FromBody] CreateSetForm setInfo)
        {
            var res = _setManager.CreateSet(HttpContext.User.Identity.Name, setInfo);
            return this.HandleManagerResponse(res);
        }

        public IActionResult Delete(string id)
        {
            var res = _setManager.DeleteSet(id);
            return this.HandleManagerResponse(res);
        }

        public IActionResult Add(string setId, string collectionId)
        {
            var res = _setManager.Add(setId, collectionId);
            return this.HandleManagerResponse(res);
        }

        public IActionResult Remove(string setId, string collectionId)
        {
            var res = _setManager.Remove(setId, collectionId);
            return this.HandleManagerResponse(res);
        }

        public IActionResult Find(string id = null, string name = null)
        {
            var res = _setManager.Find(id, name);
            return this.HandleManagerResponse(res);
        }

        public async Task<IActionResult> UserSets(string username)
        {
            var res = await _setManager.UserSets(username);
            return this.HandleManagerResponse(res);
        }
    }
}
