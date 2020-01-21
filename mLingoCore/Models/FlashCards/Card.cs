using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using mLingoCore.Models.FlashCards.Base;
using mLingoCore.Models.Forms.Collections;

namespace mLingoCore.Models.FlashCards
{
    public class Card : CardBase
    {
        public Card()
        {
            
        }

        public Card(CardUpdateModel card, Collection collectionToUpdate)
        {
            Collection = collectionToUpdate;
            CollectionId = collectionToUpdate.Id;
            Term = card.Term;
            Definition = card.Definition;
            Id = card.Id == null ? Guid.NewGuid() : new Guid(card.Id);
        }

        [Key]
        public Guid Id { get; set; }

        [ForeignKey("CollectionId")]
        public Collection Collection { get; set; }


        public bool IsUpdateNeeded(Card otherCard)
        {
            return !(Term == otherCard.Term && Definition == otherCard.Definition);
        }
    }
}
