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
            if (id != null)
            {
                try
                {
                    var set = DbContext.Sets.FirstOrDefault(s => s.Id.Equals(id));
                    var setCollections = DbContext.SetCollectionJoinTable.Where(sc => sc.SetId.Equals(id)).ToList();
                }
                catch
                {
                    return new ApiResponse {ErrorMessage = "No set with given ID found"}.WithStatusCode(404);
                }
            }
            else if (name != null)
            {
                try
                {
                    var sets = DbContext.Sets.Where(s => s.Name.Equals(name)).ToList();
                }
                catch
                {
                    return new ApiResponse { ErrorMessage = "No set with given name found" }.WithStatusCode(404);
                }
            }

            return ApiResponseExtensions.StatusCodeOnly(403);
        }

        public async Task<KeyValuePair<ApiResponse, int>> UserSets(string username)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null)
                return new ApiResponse {ErrorMessage = ErrorMessages.UsernameNotFound}.WithStatusCode(404);

            List<Set> userSets;
            try
            {
                userSets = DbContext.Sets.Where(s => s.OwnerId.Equals(user.Id)).ToList();
            }
            catch
            {
                userSets = new List<Set>();
            }

            return new ApiResponse {Response = userSets}.WithStatusCode(200);
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
                return new ApiResponse {ErrorMessage = ""}.WithStatusCode(403);
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
                return new ApiResponse {ErrorMessage = ""}.WithStatusCode(404);
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
                return new ApiResponse { ErrorMessage = "" }.WithStatusCode(404);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }
    }
}
