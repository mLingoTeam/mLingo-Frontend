using System;

namespace mLingoCore.Models.FlashCards.Base
{
    public class CardBase
    {
        public CardBase()
        {
            
        }

        public CardBase(Card card)
        {
            Term = card.Term;
            Definition = card.Definition;
            CollectionId = card.CollectionId;
        }
        public string Term { get; set; }

        public string Definition { get; set; }

        public Guid CollectionId { get; set; }
    }
}
