using System.Collections.Generic;
using mLingo.Models.Database.JoinTables;
using mLingoCore.Models.FlashCards.Base;

namespace mLingo.Models.Database.Sets
{
    public class Set : SetBase
    {
        #region Constructor

        public Set()
        {
            Collections = new List<SetCollection>();
        }

        #endregion

        #region PublicFields

        public string Id { get; set; }

        public virtual ICollection<SetCollection> Collections { get; set; }

        #endregion
    }
}
