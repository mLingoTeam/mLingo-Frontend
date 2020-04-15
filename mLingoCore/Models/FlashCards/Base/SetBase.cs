using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.FlashCards.Base
{
    /// <summary>
    /// Class holding base properties of Study Set
    /// </summary>
    public class SetBase
    {
        #region PublicFields

        [Required]
        public string Name { get; set; }

        public string OwnerId { get; set; }

        #endregion
    }
}
