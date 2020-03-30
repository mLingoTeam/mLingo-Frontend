using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using mLingo.Extensions.Api;
using mLingo.Models.Database;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.JoinTables;
using mLingo.Models.Database.Sets;
using mLingo.Models.Database.User;
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
                    //return proper response
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

        public KeyValuePair<ApiResponse, int> UserSets(string username)
        {
            throw new System.NotImplementedException();
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
            throw new System.NotImplementedException();
        }

        public KeyValuePair<ApiResponse, int> EditSet(string id, object editedData)
        {
            throw new System.NotImplementedException();
        }

        public KeyValuePair<ApiResponse, int> Add(string setId, string collectionId)
        {
            throw new System.NotImplementedException();
        }

        public KeyValuePair<ApiResponse, int> Remove(string setId, string collectionId)
        {
            throw new System.NotImplementedException();
        }
    }
}
