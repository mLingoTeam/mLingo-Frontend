using System;
using System.Collections.Generic;
using System.Linq;
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

        public static List<CollectionData> Data(this List<Collection> collections, AppDbContext context)
        {
            var data = new List<CollectionData>();
            foreach(var col in collections) data.Add(col.Data(context));
            return data;
        }

        public static List<Card> UpdateCollection(this List<Card> collection, List<Card> newCollection)
        {
            return collection.Union(newCollection).ToList();
        }
    }
}
