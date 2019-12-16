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

        public Guid Collection { get; set; }

        [ForeignKey("Collection")]
        public Collection CollectionFk { get; set; }

    }
}
