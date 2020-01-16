using System;

namespace mLingoCore.Models.FlashCards.Base
{
    public class CollectionBase
    {
        public CollectionBase()
        {
            
        }

        public CollectionBase(Collection collection)
        {
            Name = collection.Name;
            OwnerId = collection.OwnerId;
        }
        public string Name { get; set; }

        public Guid OwnerId { get; set; }
    }
}
