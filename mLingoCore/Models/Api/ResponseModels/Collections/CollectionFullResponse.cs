using System.Collections.Generic;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    public class CollectionFullResponse : CollectionOverviewResponse
    {
        public List<CardResponse> Cards { get; set; }
    }
}
