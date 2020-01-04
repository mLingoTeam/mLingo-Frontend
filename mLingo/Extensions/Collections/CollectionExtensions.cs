﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mLingo.Models.Database;
using mLingoCore.Models.FlashCards;

namespace mLingo.Extensions.Collections
{
    public static class CollectionExtensions
    {
        public static CollectionData Data(this Collection collection, AppDbContext context)
        {
            List<Card> cards;
            try
            {
                cards = context.Cards.Where(c => c.CollectionFk.Equals(collection.Id)).ToList();
            }
            catch(ArgumentNullException)
            {
                cards = new List<Card>();
            }

            return new CollectionData
            {
                Collection = collection,
                Cards = cards
            };
        }
    }
}
