using mLingo.Models.Database.Collections;
using mLingo.Models.Database.Sets;


namespace mLingo.Models.Database.JoinTables
{
    public class SetCollection
    {
        public string CollectionId { get; set; }

        public virtual Collection Collection { get; set; }

        public string SetId { get; set; }

        public virtual Set Set { get; set; }
    }
}
