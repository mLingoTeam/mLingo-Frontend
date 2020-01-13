using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mLingoCore.Models.FlashCards
{
    public class Card
    {
        [Key]
        public Guid Id { get; set; }

        public string Term { get; set; }
        
        public string Definition { get; set; }

        public Guid CollectionId { get; set; }

        [ForeignKey("CollectionId")]
        public Collection Collection { get; set; }

    }
}
