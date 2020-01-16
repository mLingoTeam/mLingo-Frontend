using System.Collections.Generic;
using mLingoCore.Models.FlashCards;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    public class CollectionFullResponse : CollectionOverviewResponse
    {
        public CollectionFullResponse(CollectionData collection) : base(collection.Collection)
        {
            Cards = new List<CardResponse>();
            foreach (var c in collection.Cards) Cards.Add(new CardResponse
            {
                CollectionId = c.CollectionId,
                Definition = c.Definition,
                Term = c.Term,
                Id = c.Id
            });

        }

        public List<CardResponse> Cards { get; set; }
    }
}
