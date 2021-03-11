using Microsoft.AspNetCore.Identity;
using mLingo.Extensions.Api;
using mLingo.Models.Database;
using mLingo.Models.Database.Sessions;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Session;
using mLingoCore.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mLingo.Modules
{
    public class StandardSessionManager : ISessionManager
    {
        public UserManager<AppUser> UserManager { get; set; }

        public AppDbContext DbContext { get; set; }


        public async Task<ApiResponse> Create(string username, string collectionId)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            var session = new Session
            {
                Id = Guid.NewGuid().ToString(),
                OwnerId = user.Id,
                CollectionId = collectionId,
            };

            try
            {
                DbContext.Sessions.Add(session);
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("create session"), e.StackTrace, 503);
            }

            return ApiResponse.StandardSuccessResponse(session.AsOverviewResponse(), 200);
        }

        public async Task<ApiResponse> Submit(string username, SubmitSessionForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            var correct = 0;
            var incorrect = 0;
            foreach(var review in form.Reviews) 
            {
                if (review.Correct) correct += 1;
                else incorrect += 1;
            }

            var sessionData = new SessionData
            {
                Id = Guid.NewGuid().ToString(),
                SessionId = form.SessionId,
                TotalCorrect = correct,
                TotalMistakes = incorrect
            };

            try
            {
                DbContext.SessionData.Add(sessionData);
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("submit session"), e.StackTrace, 503);
            }

            return ApiResponse.StandardSuccessResponse(sessionData.AsResponse(), 200);
        }
    }
}
