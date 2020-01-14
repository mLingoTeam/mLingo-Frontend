using System;
using System.Collections.Generic;

namespace mLingoCore.Models.Forms.Collections
{
    public class UpdateCollectionFormModel
    {
        public string Name { get; set; }
        
        public List<CardUpdateModel> Cards { get; set; }
    }
}
