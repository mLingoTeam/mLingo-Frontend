using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Api.ResponseModels.Sets
{
    /// <summary>
    /// Response model representing overall information about Set
    /// </summary>
    public class SetOverviewResponse : SetBase
    {
        public string Id { get; set; }
    }
}
