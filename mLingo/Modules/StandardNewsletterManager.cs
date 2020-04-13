using System;
using mLingo.Models.Database;
using mLingo.Models.Database.Newsletter;
using mLingoCore.Models.Api;
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
            try
            {
                var mailingInfo = new MailingInformation
                {
                    Id = Guid.NewGuid().ToString(),
                    Email = form.Email
                };

                DbContext.MailingList.Add(mailingInfo);
                DbContext.SaveChanges();
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("sign up for newsletter"), e.StackTrace, 500);
            }
            return ApiResponse.StatusCodeResponse(200);
        }
    }
}
