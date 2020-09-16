using System.Collections.Generic;
using mLingoCore.Models.Api.ResponseModels.Collections;

namespace mLingoCore.Models.Api.ResponseModels.Sets
{
    /// <summary>
    /// Response model representing in-depth information about set
    /// </summary>
    public class SetFullResponse : SetOverviewResponse
    {
        public List<CollectionOverviewResponse> Collections { get; set; }
    }
}
