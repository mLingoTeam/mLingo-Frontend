using System;
using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.FlashCards
{
    class Collection
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Owner { get; set; }
    }
}
