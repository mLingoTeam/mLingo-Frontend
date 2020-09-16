using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Identity;
using mLingo.Models.Database;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.JoinTables;
using mLingo.Models.Database.Sets;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Api.ResponseModels.Sets;
using mLingoCore.Models.Forms.Sets;
using mLingoCore.Services;
using mLingo.Controllers.Api;
using mLingo.Extensions.Api;

namespace mLingo.Modules
{
    /// <summary>
    /// Standard implementation of <see cref="ISetManager"/> used to manage sets of collections.
    /// </summary>
    public class StandardSetManager : ISetManager
    {
        #region PublicProperties

        public UserManager<AppUser> UserManager { get; set; }

        public AppDbContext DbContext { get; set; }

        #endregion

        #region Implementation
        /// <summary>
        /// For documentation <see cref="SetsController"/>
        /// </summary>
        public ApiResponse Find(string id, string name, string range)
        {
            if (name == null && id == null) 
                return ApiResponse.StandardErrorResponse(ErrorMessages.Server.ActionFail("search for set"), 400);

            ApiResponse response;

            if (id != null)
            {
                try
                {
                    var set = DbContext.Sets.Find(id);
                    response = ApiResponse.StandardSuccessResponse(set.AsFullResponse(), 200);
                }
                catch
                {
                    response = ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.SetNotFound(id), 404);
                }
            }
            else
            {
                try
                {
                    List<Set> sets;
                    if (range != null)
                    {
                        var split = range.Split('-');
                        var start = int.Parse(split[0]);
                        var end = int.Parse(split[1]);
                        sets = DbContext.Sets
                            .Where(s => s.Name.ToUpper().Contains(name.ToUpper()))
                            .Skip(start).Take(end - start).ToList();
                    }
                    else
                    {
                        sets = DbContext.Sets
                            .Where(s => s.Name.ToUpper().Contains(name.ToUpper()))
                            .Take(10).ToList();
                    }

                    
                    response = ApiResponse.StandardSuccessResponse(sets.Select(s => s.AsOverviewResponse()).ToList(), 200);
                }
                catch
                {
                    response = ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.SetNotFound(name), 404);
                }
            }
            
            return response;
        }

        public ApiResponse CollectionsData(string id, string name)
        {
            if (name == null && id == null)
                return ApiResponse.StandardErrorResponse(ErrorMessages.Server.ActionFail("search for set"), 400);
            
            ApiResponse response;

            if (id != null)
            {
                try
                {
                    var collections = DbContext.Sets.Find(id).Collections
                        .Select(e => e.Collection.AsOverviewResponse())
                        .ToList();

                    response = ApiResponse.StandardSuccessResponse(collections, 200);
                }
                catch
                {
                    response = ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.SetNotFound(id), 404);
                }
            }
            else
            {
                try
                {
                    var collections = DbContext.Sets.First(e => e.Name.ToUpper().Equals(name.ToUpper()))
                        .Collections.Select(e => e.Collection.AsOverviewResponse())
                        .ToList();
                    response = ApiResponse.StandardSuccessResponse(collections, 200);
                }
                catch
                {
                    response = ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.SetNotFound(name), 404);
                }
            }

            return response;
        }

        /// <summary>
        /// For documentation <see cref="SetsController"/>
        /// </summary>
        public async Task<ApiResponse> UserSets(string username)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null)
                return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            List<SetOverviewResponse> setsResponse;
            try
            {
                var userSets = DbContext.Sets.Where(s => s.OwnerId.Equals(user.Id)).ToList();
                setsResponse = userSets.Select(s => s.AsOverviewResponse()).ToList();
            }
            catch
            {
                return ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.UserHasNoSets, 404);
            }

            return ApiResponse.StandardSuccessResponse(setsResponse, 200);
        }

        /// <summary>
        /// For documentation <see cref="SetsController"/>
        /// </summary>
        public async Task<ApiResponse> CreateSet(string username, CreateSetForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            var set = form.AsSet(user.Id);

            var collections = new List<Collection>();
            form.CollectionIds.ForEach(c =>
            {
                collections.Add(DbContext.Collections.First(cc => cc.Id.Equals(c)));
            });

            var setCollections = collections.Select(c => new SetCollection
            {
                CollectionId = c.Id,
                Collection = c,
                Set = set,
                SetId = set.Id
            });

            try
            {
                DbContext.Sets.Add(set);
                DbContext.SetCollectionJoinTable.AddRange(setCollections);
                DbContext.SaveChanges();
            }
            catch
            {
                return ApiResponse.StandardErrorResponse(ErrorMessages.Server.ActionFail("create set"), 500);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        /// <summary>
        /// For documentation <see cref="SetsController"/>
        /// </summary>
        public ApiResponse DeleteSet(string id)
        {
            try
            {
                var set = DbContext.Sets.Find(id);
                var setCollections = DbContext.SetCollectionJoinTable.Where(sc => sc.SetId.Equals(id)).ToList();
                DbContext.Sets.Remove(set);
                DbContext.SetCollectionJoinTable.RemoveRange(setCollections);
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("delete set"), e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        /// <summary>
        /// For documentation <see cref="SetsController"/>
        /// </summary>
        public async Task<ApiResponse> EditSet(string id, string username, UpdateSetForm editedData)
        {
            var set = DbContext.Sets.Find(id);
            if(set == null) return ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.SetNotFound(id), 404);
            var user = await UserManager.FindByNameAsync(username);
            if(set.OwnerId != user.Id) return ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.ActionFail("edit set"), 400);

            // update name
            set.Name = editedData.Name;

            try
            {
                // update set-collections
                var setCollections = DbContext.SetCollectionJoinTable.Where(sc => sc.SetId.Equals(id));
                var updatedSetCollections = editedData.CollectionIds.Select(cId => new SetCollection
                {
                    SetId = id,
                    CollectionId = cId
                });

                var toRemove = setCollections
                    .Where(setCollection =>
                        !updatedSetCollections.Any(sc => sc.CollectionId.Equals(setCollection.CollectionId)));

                var toAdd = updatedSetCollections
                    .Where(setCollection =>
                        !setCollections.Any(sc => sc.CollectionId.Equals(setCollection.CollectionId)));

                DbContext.SetCollectionJoinTable.RemoveRange(toRemove);
                DbContext.SetCollectionJoinTable.AddRange(toAdd);
                DbContext.SaveChanges();
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("update set"), e.StackTrace, 503);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        #endregion
    }
}
