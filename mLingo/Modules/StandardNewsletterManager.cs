using System;
using mLingo.Models.Database;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Newsletter;
using mLingoCore.Services;

namespace mLingo.Modules
{
    public class StandardNewsletterManager : INewsletterManager
    {
        public AppDbContext DbContext { get; set; }

        public ApiResponse SignUp(RegisterForNewsletterForm form)
        {
            
        }
    }
}
