using mLingo.Models.Database.Collections;
using mLingo.Models.Database.Sets;


namespace mLingo.Models.Database.JoinTables
{
    /// <summary>
    /// Model required to implement many:many relationship between Sets and Collections.
    /// </summary>
    public class SetCollection
    {
        #region PublicProperties

        public string CollectionId { get; set; }

        public virtual Collection Collection { get; set; }

        public string SetId { get; set; }

        public virtual Set Set { get; set; }

        #endregion
    }
}
