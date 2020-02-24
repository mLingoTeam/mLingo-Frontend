using System.Collections.Generic;

namespace mLingoCore.Models.Forms.Collections
{
    /// <summary>
    /// Model used for serialization of updated collection data
    /// </summary>
    public class UpdateCollectionFormModel
    {
        public string Name { get; set; }

        public string BaseLanguage { get; set; }

        public string SecondLanguage { get; set; }
        
        public List<CardUpdateModel> Cards { get; set; }
    }
}
