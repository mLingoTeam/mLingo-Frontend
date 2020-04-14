using System.Linq;
using mLingo.Models.Database.Collections;
using mLingoCore.Models.Api.ResponseModels.Collections;

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
    }
}
