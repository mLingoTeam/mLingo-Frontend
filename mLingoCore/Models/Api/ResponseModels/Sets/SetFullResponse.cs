using System.Collections.Generic;
using mLingoCore.Models.Api.ResponseModels.Collections;

namespace mLingoCore.Models.Api.ResponseModels.Sets
{
    public class SetFullResponse : SetOverviewResponse
    {
        public List<CollectionOverviewResponse> Collections { get; set; }
    }
}
