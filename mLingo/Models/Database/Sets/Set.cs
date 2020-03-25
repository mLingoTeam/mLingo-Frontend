using System.Collections;
using System.Collections.Generic;
using mLingo.Models.Database.Collections;
using mLingoCore.Models.FlashCards.Base;

namespace mLingo.Models.Database.Sets
{
    public class Set : SetBase
    {
        #region Constructor

        public Set()
        {
            Collections = new List<Collection>();
        }

        #endregion

        #region PublicFields

        public string Id { get; set; }

        public virtual ICollection<Collection> Collections { get; set; }

        #endregion
    }
}
