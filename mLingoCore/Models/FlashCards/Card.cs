using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.FlashCards
{
    public class Card : CardBase
    {   
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("CollectionId")]
        public Collection Collection { get; set; }
    }
}
