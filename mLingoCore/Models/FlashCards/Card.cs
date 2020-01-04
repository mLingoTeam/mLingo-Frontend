using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mLingoCore.Models.FlashCards
{
    class Card
    {
        [Key]
        public Guid Id { get; set; }

        public string Term { get; set; }
        
        public string Definition { get; set; }

        public Guid CollectionFk { get; set; }

        [ForeignKey("CollectionFk")]
        public Collection Collection { get; set; }

    }
}
