using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    /// <summary>
    /// Model used to serialize response data about the card
    /// </summary>
    public class CardResponse : CardBase
    {
        public string Id { get; set; }
    }
}
