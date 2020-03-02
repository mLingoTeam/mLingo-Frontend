using mLingoCore.Models.FlashCards.Base;

namespace mLingo.Models.Database.Collections
{
    /// <summary>
    /// Database model holding details of the collection
    /// </summary>
    public class CollectionDetails : CollectionDetailsBase
    {
        #region Constructor

        public CollectionDetails()
        {

        }

        #endregion

        #region PublicFields

        public string Id { get; set; }

        public virtual Collection Collection { get; set; }

        #endregion
    }
}
