using System.Collections.Generic;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    /// <summary>
    /// Model used to serialize complete collection response
    /// </summary>
    public class CollectionFullResponse : CollectionOverviewResponse
    {
        public List<CardResponse> Cards { get; set; }
    }
}
