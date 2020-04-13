using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mLingo.Extensions.Api;
using mLingo.Models.Database;
using mLingo.Modules;
using mLingoCore.Models.Forms.Newsletter;
using mLingoCore.Services;

namespace mLingo.Controllers.Api
{
    [AllowAnonymous]
    [Route("api/newsletter")]
    public class NewsletterController : Controller
    {
        private readonly INewsletterManager _newsletterManager;

        public NewsletterController(INewsletterManager manager, AppDbContext dbContext)
        {
            var nm = (StandardNewsletterManager) manager;
            nm.DbContext = dbContext;
            _newsletterManager = nm;
        }

        [Route("signup")]
        [HttpPost]
        public IActionResult SignUp([FromBody] RegisterForNewsletterForm form)
        {
            var res = _newsletterManager.SignUp(form);
            return this.HandleManagerResponse(res);
        }
    }
}
