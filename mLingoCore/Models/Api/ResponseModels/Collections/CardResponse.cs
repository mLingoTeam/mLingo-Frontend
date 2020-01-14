using System;
using mLingoCore.Models.FlashCards;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    public class CardResponse : CardBase
    {
        public CardResponse(Card card) : base(card)
        {
            Id = card.Id;
        }
        public Guid Id { get; set; }
    }
}
