using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.Session.Base
{
    public class SessionBase
    {
        #region PublicFields

        [Required]
        public string OwnerId { get; set; } 

        [Required]
        public string CollectionId { get; set; }

        public bool InProgress { get; set; }

        #endregion
    }
}
