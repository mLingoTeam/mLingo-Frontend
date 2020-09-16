using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Forms.Collections
{
    /// <summary>
    /// Model used for serialization of data related to new collection
    /// </summary>
    public class CreateCollectionForm
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public List<CardBase> Cards { get; set; }
    }
}
