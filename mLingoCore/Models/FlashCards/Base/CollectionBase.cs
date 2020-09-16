using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.FlashCards.Base
{
    /// <summary>
    /// Class holding base properties of any collection
    /// </summary>
    public class CollectionBase
    {
        #region PublicFields

        [Required]
        public string Name { get; set; }

        public string OwnerId { get; set; }

        #endregion
    }
}
