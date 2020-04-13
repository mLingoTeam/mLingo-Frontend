using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mLingo.Extensions.Api;
using mLingo.Models.Database;
using mLingo.Modules;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Newsletter;
using mLingoCore.Services;

namespace mLingo.Controllers.Api
{
    /// <summary>
    /// Controller that handles any action related to newsletter
    /// </summary>
    [AllowAnonymous]
    [Route("api/newsletter")]
    public class NewsletterController : Controller
    {
        #region PrivateFields

        private readonly INewsletterManager _newsletterManager;

        #endregion

        #region Constructor

        public NewsletterController(INewsletterManager manager, AppDbContext dbContext)
        {
            var nm = (StandardNewsletterManager)manager;
            nm.DbContext = dbContext;
            _newsletterManager = nm;
        }

        #endregion

        /// <summary>
        /// Adds submitted email to mLingo mailing list
        /// </summary>
        /// <remarks>
        /// {
        ///     "Email": "example@email.com"
        /// }
        /// </remarks>
        /// <param name="form">Form with required information</param>
        /// <response code="200">Successful, address added to mailing list</response>
        /// <response code="500">Filed to add address to mailing list, server fault. Please check <see cref="ErrorRapport"/> for details</response>
        [Route("signup")]
        [HttpPost]
        public IActionResult SignUp([FromBody] RegisterForNewsletterForm form)
        {
            var res = _newsletterManager.SignUp(form);
            return this.HandleManagerResponse(res);
        }
    }
}
