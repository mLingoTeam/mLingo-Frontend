using System.Collections.Generic;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Forms.Sets
{
    /// <summary>
    /// Model for information required to create set
    /// </summary>
    public class CreateSetForm : SetBase
    {
        public List<string> CollectionIds { get; set; }
    }
}
