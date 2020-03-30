using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using mLingo.Extensions.Api;
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

namespace mLingo.Modules
{
    public class StandardSetManager : ISetManager
    {
        public UserManager<AppUser> UserManager { get; set; }

        public AppDbContext DbContext { get; set; }


        public KeyValuePair<ApiResponse, int> Find(string id, string name)
        {
            if (name == null && id == null) return ApiResponseExtensions.StatusCodeOnly(403);

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

                    return new ApiResponse {Response = res}.WithStatusCode(200);
                }
                catch
                {
                    return new ApiResponse {ErrorMessage = ErrorMessages.SetNotFound}.WithStatusCode(404);
                }
            }

            try
            {
                var sets = DbContext.Sets.Where(s => s.Name.Equals(name)).ToList();
                var setResponse = sets.Select(s => new SetOverviewResponse
                {
                    Name = s.Name,
                    OwnerId = s.OwnerId
                });

                return new ApiResponse {Response = setResponse}.WithStatusCode(200);
            }
            catch
            {
                return new ApiResponse { ErrorMessage = ErrorMessages.SetNotFound }.WithStatusCode(404);
            }
        }

        public async Task<KeyValuePair<ApiResponse, int>> UserSets(string username)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null)
                return new ApiResponse {ErrorMessage = ErrorMessages.UsernameNotFound}.WithStatusCode(404);

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
                setsResponse = new List<SetOverviewResponse>();
            }

            return new ApiResponse {Response = setsResponse }.WithStatusCode(200);
        }

        public KeyValuePair<ApiResponse, int> CreateSet(string username, CreateSetForm newSetData)
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
                return new ApiResponse { ErrorMessage = ErrorMessages.DbError }.WithStatusCode(403);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }

        public KeyValuePair<ApiResponse, int> DeleteSet(string id)
        {
            try
            {
                var set = DbContext.Sets.Find(id);
                var setCollections = DbContext.SetCollectionJoinTable.Where(sc => sc.SetId.Equals(id)).ToList();
                DbContext.Sets.Remove(set);
                DbContext.SetCollectionJoinTable.RemoveRange(setCollections);
            }
            catch
            {
                return new ApiResponse { ErrorMessage = "" }.WithStatusCode(404);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }

        public KeyValuePair<ApiResponse, int> EditSet(string id, object editedData)
        {
            throw new System.NotImplementedException();
        }

        public KeyValuePair<ApiResponse, int> Add(string setId, string collectionId)
        {
            try
            {
                var set = DbContext.Sets.Find(setId);
                var collection = DbContext.Collections.Find(collectionId);
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
            catch
            {
                return new ApiResponse {ErrorMessage = ErrorMessages.DbError}.WithStatusCode(404);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }



        public KeyValuePair<ApiResponse, int> Remove(string setId, string collectionId)
        {
            var key = new {setId, collectionId};
            try
            {
                var sc = DbContext.SetCollectionJoinTable.Find(key);
                DbContext.SetCollectionJoinTable.Remove(sc);
                DbContext.SaveChanges();
            }
            catch
            {
                return new ApiResponse { ErrorMessage = ErrorMessages.DbError }.WithStatusCode(404);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }
    }
}
