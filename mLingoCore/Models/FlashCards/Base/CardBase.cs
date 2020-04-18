using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.FlashCards.Base
{
    /// <summary>
    /// Class holding base properties of learning card
    /// </summary>
    public class CardBase
    {
        #region PublicFields

        [Required]
        public string Term { get; set; }

        [Required]
        public string Definition { get; set; }

        public string? CollectionId { get; set; }

        #endregion
    }
}
