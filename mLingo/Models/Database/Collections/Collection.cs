using System;
using System.Collections.Generic;
using mLingo.Models.Database.User;
using mLingoCore.Models.FlashCards.Base;

namespace mLingo.Models.Database.Collections
{
    /// <summary>
    /// Database model representing collection of learning cards
    /// </summary>
    public class Collection : CollectionBase
    {
        public Collection()
        {
            Cards = new List<Card>();
        }

        public string Id { get; set; }

        public List<Card> Cards { get; set; }

        public AppUser Owner { get; set; }
    }
}                                                                                                                                                                                                                                                                                                               
