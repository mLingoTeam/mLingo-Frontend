using System;
using System.Collections.Generic;
using mLingoCore.Models.FlashCards.Base;

namespace mLingo.Models.Database.Collections
{
    /// <summary>
    /// Database model representing collection of learning cards
    /// </summary>
    public class Collection : CollectionBase
    {
        public Guid Id { get; set; }

        public virtual ICollection<Card> Cards { get; set; }
    }
}                                                                                                                                                                                                                                                                                                               
