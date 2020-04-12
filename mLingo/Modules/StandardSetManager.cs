using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using mLingo.Models.Database;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.JoinTables;
using mLingo.Models.Database.Sets;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Api.ResponseModels.Collections;
using mLingoCore.Models.Api.ResponseModels.Sets;
using mLingoCore.Models.Forms.Sets;
using mLingoCore.Services;
using mLingo.Controllers.Api;

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
                    var setCollections = DbContext.SetCollectionJoinTable.Where(sc => sc.SetId.Equals(id)).ToList();
                    var collectionsNormalized = setCollections.Select(sc => new CollectionOverviewResponse
                    {
                        Id = sc.Collection.Id,
                        Name = sc.Collection.Name,
                        OwnerId = sc.Collection.OwnerId,
                        BaseLanguage = sc.Collection.Details.BaseLanguage,
                        SecondLanguage = sc.Collection.Details.SecondLanguage,
                        PlayCount = sc.Collection.Details.PlayCount,
                        Rating = sc.Collection.Details.Rating
                    }).ToList();

                    var res = new SetFullResponse
                    {
                        Name = set.Name,
                        OwnerId = set.OwnerId,
                        Collections = collectionsNormalized
                    };
                    response = ApiResponse.StandardSuccessResponse(res, 200);
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

                    var res = sets.Select(s => new SetOverviewResponse
                    {
                        Name = s.Name,
                        OwnerId = s.OwnerId
                    });
                    response = ApiResponse.StandardSuccessResponse(res, 200);
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
                setsResponse = userSets.Select(s => new SetOverviewResponse
                {
                    Id = s.Id,
                    Name = s.Name,
                    OwnerId = s.OwnerId
                }).ToList();

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
        public ApiResponse CreateSet(string username, CreateSetForm newSetData)
        {
            var set = new Set
            {
                Id = Guid.NewGuid().ToString(),
                Name = newSetData.Name,
                Collections = null
            };

            var collections = new List<Collection>();
            newSetData.CollectionIds.ForEach(c =>
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
        public ApiResponse EditSet(string id, object editedData)
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// For documentation <see cref="SetsController"/>
        /// </summary>
        public ApiResponse Add(string setId, string collectionId)
        {
            try
            {
                var set = DbContext.Sets.Find(setId);
                var collection = DbContext.Collections.Find(collectionId);
                if (set == null || collection == null)
                    return ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.ActionFail("add"), 400);
                

                var setCollection = new SetCollection
                {
                    Set = set,
                    Collection = collection,
                    SetId = set.Id,
                    CollectionId = collection.Id
                };
                DbContext.SetCollectionJoinTable.Add(setCollection);
                DbContext.SaveChanges();
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("add collection to set"), e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        /// <summary>
        /// For documentation <see cref="SetsController"/>
        /// </summary>
        public ApiResponse Remove(string setId, string collectionId)
        {
            var key = new { setId, collectionId };
            try
            {
                var sc = DbContext.SetCollectionJoinTable.Find(key);
                if(sc == null) 
                    return ApiResponse.StandardErrorResponse(ErrorMessages.SetsManager.ActionFail("delete"), 400);
                DbContext.SetCollectionJoinTable.Remove(sc);
                DbContext.SaveChanges();
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("remove collection from set"), e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(202);
        }

        #endregion
    }
}
