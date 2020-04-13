using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    /// <summary>
    /// Model used to serialize overview of the collection
    /// </summary>
    public class CollectionOverviewResponse : CollectionBase
    {
        public string Id { get; set; }

        public string BaseLanguage { get; set; }

        public string SecondLanguage { get; set; }

        public int PlayCount { get; set; }

        public float Rating { get; set; }

        public string Description { get; set; }
    }
}
