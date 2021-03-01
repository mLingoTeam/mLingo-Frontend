using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Identity;
using mLingo.Models.Database;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Collections;
using mLingoCore.Services;
using mLingo.Controllers.Api;
using mLingo.Extensions.Api;

namespace mLingo.Modules
{
    /// <summary>
    /// Standard implementation of <see cref="ICollectionManager"/> used to manage collections of cards.
    /// </summary>
    public class StandardCollectionManager : ICollectionManager
    {
        #region PublicProperties

        public UserManager<AppUser> UserManager { get; set; }

        public AppDbContext DbContext { get; set; }

        public ILanguageDetector LanguageDetector { get; set; }

        #endregion

        #region Implementation

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public ApiResponse Find(string id, string name, string range=null)
        {
            if (id != null)
            {
                var collection = DbContext.Collections.Find(id);
                return collection == null ? 
                    ApiResponse.StandardErrorResponse(ErrorMessages.CollectionsManager.CollectionNotFound(id), 404) : 
                    ApiResponse.StandardSuccessResponse(collection.AsFullResponse(), 200);
            }

            if (name == null) return ApiResponse.StandardErrorResponse(ErrorMessages.Server.ActionFail("search for collection"), 400);
            
            List<Collection> collections;
            try
            {
                    
                if (range != null)
                {
                    var split = range.Split('-');
                    var start = int.Parse(split[0]);
                    var end = int.Parse(split[1]);
                    collections = DbContext.Collections
                        .Where(c => c.Name.ToUpper().Contains(name.ToUpper()))
                        .Skip(start).Take(end - start).ToList();
                }
                else 
                {
                    collections = DbContext.Collections
                        .Where(c => c.Name.ToUpper().Contains(name.ToUpper()))
                        .Take(10).ToList();
                }
                    
            }
            catch (ArgumentNullException)
            {
                return ApiResponse.StandardErrorResponse(ErrorMessages.CollectionsManager.CollectionNotFound(name), 404);
            }

            return ApiResponse.StandardSuccessResponse(collections.Select(c => c.AsOverviewResponse()).ToList(), 200);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public ApiResponse UserCollections(string username)
        {
            var user = DbContext.Users.FirstOrDefault(u => u.UserName.Equals(username));
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            List<Collection> collections;
            try
            {
                collections = DbContext.Collections.Where(c => c.OwnerId.Equals(user.Id)).ToList();
            }
            catch (ArgumentNullException)
            {
                collections = null;
            }

            return collections == null ? 
                ApiResponse.StandardErrorResponse(ErrorMessages.CollectionsManager.UserHasNoCollections, 404) :
                ApiResponse.StandardSuccessResponse(collections.Select(c => c.AsOverviewResponse()).ToList(), 200);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public async Task<ApiResponse> Create(string username, CreateCollectionForm form)
        {
            var user = await UserManager.FindByNameAsync(username);
            if(user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 404);

            var collection = form.AsCollection(user.Id);

            var testBaseLangStr = "";
            var testSecondLangStr = "";
            form.Cards.ForEach(c =>
            {
                testBaseLangStr += $" {c.Definition}";
                testSecondLangStr += $" {c.Term}";
            });

            var baseLang = LanguageDetector.DetectLanguage(testBaseLangStr.Trim());
            var secondLang = LanguageDetector.DetectLanguage(testSecondLangStr.Trim());


            var details = form.AsCollectionDetails(collection.DetailsId, baseLang, secondLang);
            var cards = form.GetNormalizedCards(collection);

            try
            {
                DbContext.Collections.Add(collection);
                DbContext.Cards.AddRange(cards);
                DbContext.CollectionDetails.Add(details);
                DbContext.SaveChanges();
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("create collection"), e.StackTrace, 503);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public async Task<ApiResponse> Update(string id, string username, UpdateCollectionForm updatedCollection)
        {
            // find collection to update
            var collectionToUpdate = DbContext.Collections.Find(id);
            if (collectionToUpdate == null)
                return ApiResponse.StandardErrorResponse(ErrorMessages.CollectionsManager.CollectionNotFound(id), 404);

            // check if user trying to update collection is its owner
            var user = await UserManager.FindByNameAsync(username);
            if(user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.AccountManager.UserNotFound(username), 400);
            if (!user.Id.Equals(collectionToUpdate.OwnerId)) return ApiResponse.StatusCodeResponse(401);

            // update name
            collectionToUpdate.Name = updatedCollection.Name;

            //update details
            var details = DbContext.CollectionDetails.Find(collectionToUpdate.DetailsId);
            details.BaseLanguage = updatedCollection.BaseLanguage;
            details.SecondLanguage = updatedCollection.SecondLanguage;
            details.Description = updatedCollection.Description;

            // normalize and sort updated cards
            var cardsToAdd = new List<Card>();
            var cardsToUpdate = new List<Card>();
            var cardsUnchanged = new List<Card>();

            foreach (var card in updatedCollection.Cards)
            {
                var normalizedCard = new Card(card)
                {
                    Collection = collectionToUpdate,
                    CollectionId = collectionToUpdate.Id
                };


                if (DbContext.Cards.Contains(normalizedCard))
                {
                    if (DbContext.Cards.First(c => c.Id.Equals(normalizedCard.Id)).IsUpdateNeeded(normalizedCard))
                        cardsToUpdate.Add(normalizedCard);
                    else cardsUnchanged.Add(normalizedCard);
                }
                else
                {
                    cardsToAdd.Add(normalizedCard);
                }
            }

            // create list of cards to remove
            var cardsToRemove = DbContext.Cards
                .Where(c => c.CollectionId.Equals(collectionToUpdate.Id)).ToList()
                .Where(card => !cardsToAdd.Any(cc => cc.Id.Equals(card.Id)) && !cardsToUpdate.Any(cc => cc.Id.Equals(card.Id)) && !cardsUnchanged.Any(cc => cc.Id.Equals(card.Id)))
                .ToList();

            // add, update and remove cards
            try
            {
                DbContext.Cards.RemoveRange(cardsToRemove);
                DbContext.Cards.AddRange(cardsToAdd);

                foreach (var updated in cardsToUpdate)
                {
                    var card = DbContext.Cards.Find(updated.Id);
                    if (card == null) continue;

                    card.Term = updated.Term;
                    card.Definition = updated.Definition;
                }

                DbContext.SaveChanges();
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("edit collection"), e.StackTrace, 503);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public async Task<ApiResponse> DetectLanguage(string collectionId, string username)
        {
            var collection = DbContext.Collections.Find(collectionId);
            var user = await UserManager.FindByNameAsync(username);
            if (user.Id != collection.OwnerId) return ApiResponse.StatusCodeResponse(401);

            var testBaseStr = "";
            var testSecondStr = "";
            collection.Cards.ForEach(c =>
            {
                testBaseStr += $" {c.Definition}";
                testSecondStr += $" {c.Term}";
            });

            var baseLang = LanguageDetector.DetectLanguage(testBaseStr);
            var secondLang = LanguageDetector.DetectLanguage(testSecondStr);

            try
            {
                var details = DbContext.CollectionDetails.Find(collection.DetailsId);
                details.BaseLanguage = baseLang;
                details.SecondLanguage = secondLang;
                DbContext.SaveChanges();
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("detect language"), e.StackTrace, 503);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public ApiResponse Delete(string id)
        {
            try
            {
                DbContext.Collections.Remove(DbContext.Collections.First(c => c.Id.Equals(id)));
                DbContext.Cards.RemoveRange(DbContext.Cards.Where(c => c.CollectionId.Equals(id)));
                DbContext.SetCollectionJoinTable.RemoveRange(DbContext.SetCollectionJoinTable.Where(s => s.CollectionId.Equals(id)));
                DbContext.SaveChanges();
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("delete collection"), e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public async Task<ApiResponse> Import(string importId, string targetId, string username)
        {
            var import = DbContext.Collections.Find(importId);
            var target = DbContext.Collections.Find(targetId);

            if(import == null) return ApiResponse.StandardErrorResponse(ErrorMessages.CollectionsManager.CollectionNotFound(importId), 404);
            if(target == null) return ApiResponse.StandardErrorResponse(ErrorMessages.CollectionsManager.CollectionNotFound(targetId), 404);


            var user = await UserManager.FindByNameAsync(username);
            if(user.Id != target.OwnerId) return ApiResponse.StandardErrorResponse(ErrorMessages.CollectionsManager.ActionFail("import"), 401);

            try
            {
                DbContext.Cards.AddRange(
                    import.Cards.Select(card => new Card
                    {
                        CollectionId = targetId,
                        Term = card.Term,
                        Definition = card.Definition,
                        Id = Guid.NewGuid().ToString()
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.Server.ActionFail("delete collection"), e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(200);
        }

        #endregion
    }
}