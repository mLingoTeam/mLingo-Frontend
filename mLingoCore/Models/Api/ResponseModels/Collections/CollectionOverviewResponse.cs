using System;
using mLingoCore.Models.FlashCards;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Api.ResponseModels
{
    public class CollectionOverviewResponse : CollectionBase
    {
        public CollectionOverviewResponse(Collection collection) : base(collection)
        {
            Id = collection.Id;
        }

        public Guid Id { get; set; }
    }
}
