using System.Collections.Generic;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Forms.Collections
{
    /// <summary>
    /// Model used for serialization of data related to new collection
    /// </summary>
    public class CreateCollectionFormModel
    {
        public string Name { get; set; }

        public List<CardBase> Cards { get; set; }
    }
}
