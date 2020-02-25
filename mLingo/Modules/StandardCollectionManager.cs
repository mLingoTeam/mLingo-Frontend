using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IvanAkcheurov.Commons;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using mLingo.Extensions.Api;
using mLingo.Models.Database;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.User;
using mLingoCore.Models.Api;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Api.ResponseModels.Collections;
using mLingoCore.Models.Forms.Collections;
using mLingoCore.Services;

namespace mLingo.Modules
{
    public class StandardCollectionManager : ICollectionManager
    {
        public UserManager<AppUser> UserManager { get; set; }

        public AppDbContext DbContext { get; set; }

        public ILanguageDetector LanguageDetector { get; set; }

        public KeyValuePair<ApiResponse, int> Find(string id, string name)
        {
            if (!id.IsNullOrEmpty())
            {
                var collection = DbContext.Collections.Find(id);
                if (collection == null)
                    return new ApiResponse {ErrorMessage = ErrorMessages.NoSuchCollection}.WithStatusCode(403);

                var cards = collection.Cards
                    .Select(card => new CardResponse { CollectionId = card.CollectionId, Definition = card.Definition, Term = card.Term, Id = card.Id })
                    .ToList();

                return new ApiResponse
                {
                    Response = new CollectionFullResponse
                    {
                        Id = collection.Id,
                        Name = collection.Name,
                        OwnerId = collection.OwnerId,
                        Cards = cards,
                        BaseLanguage = collection.Details.BaseLanguage,
                        SecondLanguage = collection.Details.SecondLanguage,
                        PlayCount = collection.Details.PlayCount,
                        Rating = collection.Details.Rating
                    }
                }.WithStatusCode(200);
            }

            if (!name.IsNullOrEmpty())
            {
                List<Collection> collections;
                try
                {
                    collections = DbContext.Collections.Where(c => c.Name.Equals(name)).ToList();
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

                return new ApiResponse {Response = colls}.WithStatusCode(200);
            }

            return new ApiResponse {ErrorMessage = ErrorMessages.InvalidQuery}.WithStatusCode(403);
        }

        public KeyValuePair<ApiResponse, int> UserCollections(string username)
        {
            var user = DbContext.Users.FirstOrDefault(u => u.UserName.Equals(username));
            if (user == null) return new ApiResponse {ErrorMessage = ErrorMessages.UsernameNotFound}.WithStatusCode(404);

            List<Collection> collections;
            try
            {
                collections = DbContext.Collections.Where(c => c.OwnerId.Equals(user.Id)).ToList();
            }
            catch (ArgumentNullException)
            {
                collections = new List<Collection>();
            }

            if (collections.Count == 0) return new ApiResponse {ErrorMessage = ErrorMessages.NoSuchCollection}.WithStatusCode(404);

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

            return new ApiResponse {Response = collectionsNormalized}.WithStatusCode(200);
        }

        public async Task<KeyValuePair<ApiResponse, int>> Create(string username, CreateCollectionFormModel newCollectionData)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponseExtensions.StatusCodeOnly(401);

            var colId = Guid.NewGuid().ToString();
            var detailsId = Guid.NewGuid().ToString();
            var collection = new Collection
            {
                Id = colId,
                Name = newCollectionData.Name,
                OwnerId = user.Id,
                DetailsId = detailsId
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
            catch
            {
                return new ApiResponse {ErrorMessage = ""}.WithStatusCode(403);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }

        public async Task<KeyValuePair<ApiResponse, int>> Update(string id, string username, UpdateCollectionFormModel updatedCollection)
        {
            // find collection to update
            var collectionToUpdate = DbContext.Collections.Find(id);
            if (collectionToUpdate == null)
                return new ApiResponse
                {
                    ErrorMessage = "Collection does not exist"
                }.WithStatusCode(403);

            // check if user trying to update collection is its owner
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return ApiResponseExtensions.StatusCodeOnly(401);
            var uid = user.Id;
            if (!uid.Equals(collectionToUpdate.OwnerId)) return ApiResponseExtensions.StatusCodeOnly(401);

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
                    if(card == null) continue;

                    card.Term = updated.Term;
                    card.Definition = updated.Definition;
                }

                DbContext.SaveChanges();
            }
            catch
            {
                return ApiResponseExtensions.StatusCodeOnly(500);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }

        public async Task<KeyValuePair<ApiResponse, int>> DetectLanguage(string collectionId, string username)
        {
            var collection = DbContext.Collections.Find(collectionId);
            var user = await UserManager.FindByNameAsync(username);
            if (user.Id != collection.OwnerId) return ApiResponseExtensions.StatusCodeOnly(401);

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

            return ApiResponseExtensions.StatusCodeOnly(200);
        }

        public KeyValuePair<ApiResponse, int> Delete(string id)
        {
            try
            {
                DbContext.Collections.Remove(DbContext.Collections.First(c => c.Id.Equals(id)));
                DbContext.Cards.RemoveRange(DbContext.Cards.Where(c => c.CollectionId.Equals(id)));
                DbContext.SaveChanges();
            }
            catch
            {
                return ApiResponseExtensions.StatusCodeOnly(403);
            }

            return ApiResponseExtensions.StatusCodeOnly(202);
        }
    }
}