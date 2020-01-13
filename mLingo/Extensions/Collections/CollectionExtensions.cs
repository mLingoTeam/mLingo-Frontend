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
                cards = context.Cards.Where(c => c.CollectionId.Equals(collection.Id)).ToList();
                for (var i = 0; i < cards.Count; i++) cards[i] = cards[i].AsResponse();
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

        public static Card AsResponse(this Card card)
        {
            return new Card
            {
                Id = card.Id,
                Term = card.Term,
                Definition = card.Definition,
                CollectionId = card.CollectionId,
                Collection = null
            };
        }

        public static Collection AsResponse(this Collection collection)
        {
            return new Collection
            {
                Id = collection.Id,
                Name = collection.Name,
                OwnerId =  collection.OwnerId,
                UserInformation = null
            };
        }
    }
}
