using System;
using Microsoft.AspNetCore.Mvc;
using mLingo.Models.Database;
using mLingo.Modules;
using mLingoCore.Models.Forms.Newsletter;
using mLingoCore.Services;

namespace mLingo.Controllers.Api
{
    public class NewsletterController : Controller
    {
        public NewsletterController(INewsletterManager manager, AppDbContext dbContext)
        {
            
        }

        public IActionResult SignUp([FromBody] RegisterForNewsletterForm form)
        {
            throw new NotImplementedException();
        }
    }
}
