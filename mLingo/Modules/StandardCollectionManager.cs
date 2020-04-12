using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Identity;
using mLingo.Models.Database;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Api.ResponseModels.Collections;
using mLingoCore.Models.Forms.Collections;
using mLingoCore.Services;
using mLingo.Controllers.Api;

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
            if (!id.IsNullOrEmpty())
            {
                var collection = DbContext.Collections.Find(id);
                if (collection == null)
                    return ApiResponse.StandardErrorResponse(ErrorMessages.NoSuchCollection, 403);

                var cards = collection.Cards
                    .Select(card => new CardResponse { CollectionId = card.CollectionId, Definition = card.Definition, Term = card.Term, Id = card.Id })
                    .ToList();

                return ApiResponse.StandardSuccessResponse(new CollectionFullResponse
                {
                    Id = collection.Id,
                    Name = collection.Name,
                    OwnerId = collection.OwnerId,
                    Cards = cards,
                    BaseLanguage = collection.Details.BaseLanguage,
                    SecondLanguage = collection.Details.SecondLanguage,
                    PlayCount = collection.Details.PlayCount,
                    Rating = collection.Details.Rating
                }, 200);
            }

            if (!name.IsNullOrEmpty())
            {
                List<Collection> collections;
                try
                {
                    collections = DbContext.Collections.Where(c => c.Name.ToUpper().Contains(name.ToUpper())).ToList();
                    if (range != null)
                    {
                        var split = range.Split('-');
                        var start = int.Parse(split[0]);
                        var end = int.Parse(split[1]);
                        collections = collections.Skip(start).Take(end).ToList();
                    }
                    else if(collections.Count > 10)
                    {
                        collections = collections.Take(10).ToList();
                    }
                    
                }
                catch (ArgumentNullException)
                {
                    collections = new List<Collection>();
                }

                var colls = collections
                    .Select(c => new CollectionOverviewResponse
                    {
                        Id = c.Id,
                        Name = c.Name,
                        OwnerId = c.OwnerId,
                        BaseLanguage = c.Details.BaseLanguage,
                        SecondLanguage = c.Details.SecondLanguage,
                        PlayCount = c.Details.PlayCount,
                        Rating = c.Details.Rating
                    })
                    .ToList();

                return ApiResponse.StandardSuccessResponse(colls, 200);
            }

            return ApiResponse.StandardErrorResponse(ErrorMessages.InvalidQuery, 403);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public ApiResponse UserCollections(string username)
        {
            var user = DbContext.Users.FirstOrDefault(u => u.UserName.Equals(username));
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.UsernameNotFound, 404);

            List<Collection> collections;
            try
            {
                collections = DbContext.Collections.Where(c => c.OwnerId.Equals(user.Id)).ToList();
            }
            catch (ArgumentNullException)
            {
                collections = new List<Collection>();
            }

            if (collections.Count == 0) return ApiResponse.StandardErrorResponse(ErrorMessages.NoSuchCollection, 404);

            var collectionsNormalized = collections
                .Select(c => new CollectionOverviewResponse
                {
                    Id = c.Id,
                    Name = c.Name,
                    OwnerId = c.OwnerId,
                    BaseLanguage = c.Details.BaseLanguage,
                    SecondLanguage = c.Details.SecondLanguage,
                    PlayCount = c.Details.PlayCount,
                    Rating = c.Details.Rating
                })
                .ToList();

            return ApiResponse.StandardSuccessResponse(collectionsNormalized, 200);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public async Task<ApiResponse> Create(string username, CreateCollectionFormModel newCollectionData)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponse.StandardErrorResponse(ErrorMessages.UsernameNotFound, 404);

            var colId = Guid.NewGuid().ToString();
            var detailsId = Guid.NewGuid().ToString();
            var collection = new Collection
            {
                Id = colId,
                Name = newCollectionData.Name,
                OwnerId = user.Id,
                DetailsId = detailsId,
                Sets = null
            };

            var testBaseLangStr = "";
            var testSecondLangStr = "";
            newCollectionData.Cards.ForEach(c =>
            {
                testBaseLangStr += $" {c.Definition}";
                testSecondLangStr += $" {c.Term}";
            });

            var baseLang = LanguageDetector.DetectLanguage(testBaseLangStr.Trim());
            var secondLang = LanguageDetector.DetectLanguage(testSecondLangStr.Trim());


            var details = new CollectionDetails
            {
                Id = detailsId,
                PlayCount = 0,
                Rating = 0,
                BaseLanguage = baseLang,
                SecondLanguage = secondLang
            };

            var cards = newCollectionData.Cards.Select(c => new Card
            {
                Id = Guid.NewGuid().ToString(),
                Collection = collection,
                CollectionId = collection.Id,
                Term = c.Term,
                Definition = c.Definition
            })
                .ToList();

            try
            {
                DbContext.Collections.Add(collection);
                DbContext.Cards.AddRange(cards);
                DbContext.CollectionDetails.Add(details);
                DbContext.SaveChanges();
            }
            catch(Exception e)
            {
                return ApiResponse.ServerExceptionResponse(ErrorMessages.DbError, e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(202);
        }

        /// <summary>
        /// For documentation <see cref="CollectionsController"/>
        /// </summary>
        public async Task<ApiResponse> Update(string id, string username, UpdateCollectionFormModel updatedCollection)
        {
            // find collection to update
            var collectionToUpdate = DbContext.Collections.Find(id);
            if (collectionToUpdate == null)
                return ApiResponse.StandardErrorResponse(ErrorMessages.NoSuchCollection, 403);

            // check if user trying to update collection is its owner
            var user = await UserManager.FindByNameAsync(username);
            if (!user.Id.Equals(collectionToUpdate.OwnerId)) return ApiResponse.StatusCodeResponse(401);

            // update name
            collectionToUpdate.Name = updatedCollection.Name;

            //updated details
            var details = DbContext.CollectionDetails.Find(collectionToUpdate.DetailsId);
            details.BaseLanguage = updatedCollection.BaseLanguage;
            details.SecondLanguage = updatedCollection.SecondLanguage;

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
                return ApiResponse.ServerExceptionResponse(ErrorMessages.DbError, e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(202);
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

            var details = DbContext.CollectionDetails.Find(collection.DetailsId);
            details.BaseLanguage = baseLang;
            details.SecondLanguage = secondLang;

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
                return ApiResponse.ServerExceptionResponse(ErrorMessages.DbError, e.StackTrace, 500);
            }

            return ApiResponse.StatusCodeResponse(202);
        }

        #endregion
    }
}