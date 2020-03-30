using System.Collections.Generic;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Forms.Sets
{
    public class CreateSetForm : SetBase
    {
        public List<string> CollectionIds { get; set; }
    }
}
