using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    /// <summary>
    /// Model used to serialize overview of the collection
    /// </summary>
    public class CollectionOverviewResponse : CollectionBase
    {
        public string Id { get; set; }
    }
}
