using System.Collections.Generic;
using mLingoCore.Models.FlashCards;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    public class CollectionFullResponse : CollectionOverviewResponse
    {
        public CollectionFullResponse(CollectionData collection) : base(collection.Collection)
        {
            var l = new List<CardResponse>();
            foreach (var c in collection.Cards) l.Add(new CardResponse
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
