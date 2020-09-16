using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Forms.Collections
{
    /// <summary>
    /// Model that is used to serialize data about updated card
    /// </summary>
    public class CardUpdateForm : CardBase
    {
        public string Id { get; set; }
    }
}
