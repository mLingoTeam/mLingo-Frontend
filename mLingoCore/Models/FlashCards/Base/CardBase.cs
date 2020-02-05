using System;

namespace mLingoCore.Models.FlashCards.Base
{
    /// <summary>
    /// Class holding base properties of learning card
    /// </summary>
    public class CardBase
    {
        #region PublicFields

        public string Term { get; set; }

        public string Definition { get; set; }

        public string CollectionId { get; set; }

        #endregion
    }
}
