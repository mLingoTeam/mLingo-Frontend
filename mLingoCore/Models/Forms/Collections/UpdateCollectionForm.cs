using System.Collections.Generic;

namespace mLingoCore.Models.Forms.Collections
{
    /// <summary>
    /// Model used for serialization of updated collection data
    /// </summary>
    public class UpdateCollectionForm
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string BaseLanguage { get; set; }

        public string SecondLanguage { get; set; }
        
        public List<CardUpdateForm> Cards { get; set; }
    }
}
