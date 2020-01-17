using System;
using System.Collections.Generic;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Forms.Collections
{
    public class CreateCollectionFormModel
    {
        public string Name { get; set; }

        public List<CardBase> Cards { get; set; }
    }
}
