using System.Linq;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.Sessions;
using mLingo.Models.Database.Sets;
using mLingoCore.Models.Api.ResponseModels;
using mLingoCore.Models.Api.ResponseModels.Collections;
using mLingoCore.Models.Api.ResponseModels.Sets;

namespace mLingo.Extensions.Api
{
    public static class ModelsExtensions
    {
        public static CollectionOverviewResponse AsOverviewResponse(this Collection collection)
        {
            return new CollectionOverviewResponse
            {
                Id = collection.Id,
                Name = collection.Name,
                Description = collection.Details.Description,
                OwnerId = collection.OwnerId,
                BaseLanguage = collection.Details.BaseLanguage,
                SecondLanguage = collection.Details.SecondLanguage,
                PlayCount = collection.Details.PlayCount,
                Rating = collection.Details.Rating
            };
        }

        public static CollectionFullResponse AsFullResponse(this Collection collection)
        {
            return new CollectionFullResponse
            {
                Id = collection.Id,
                Name = collection.Name,
                Description = collection.Details.Description,
                OwnerId = collection.OwnerId,
                BaseLanguage = collection.Details.BaseLanguage,
                SecondLanguage = collection.Details.SecondLanguage,
                PlayCount = collection.Details.PlayCount,
                Rating = collection.Details.Rating,
                Cards = collection.Cards.Select(card => card.AsResponse()).ToList()
        };
        }

        public static CardResponse AsResponse(this Card card)
        {
            return new CardResponse
            {
                CollectionId = card.CollectionId,
                Definition = card.Definition,
                Term = card.Term,
                Id = card.Id
            };
        }

        public static SetOverviewResponse AsOverviewResponse(this Set set)
        {
            return new SetOverviewResponse
            {
                Id = set.Id,
                Name = set.Name,
                OwnerId = set.OwnerId
            };
        }

        public static SetFullResponse AsFullResponse(this Set set)
        {
            return new SetFullResponse
            {
                Id = set.Id,
                Name = set.Name,
                OwnerId = set.OwnerId,
                Collections = set.Collections.Select(sc => sc.Collection.AsOverviewResponse()).ToList()
            };
        }

        public static SessionOverviewResponse AsOverviewResponse(this Session session)
        {
            return new SessionOverviewResponse {
                SessionId = session.Id
            };
        }

        public static SessionDataResponse AsResponse(this SessionData sessionData)
        {
            return new SessionDataResponse
            {
                TotalCorrect = sessionData.TotalCorrect,
                TotalMistakes = sessionData.TotalMistakes
            };
        }
    }
}
