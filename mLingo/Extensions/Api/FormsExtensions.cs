using System;
using System.Collections.Generic;
using System.Linq;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.Sets;
using mLingoCore.Models.Forms.Collections;
using mLingoCore.Models.Forms.Sets;

namespace mLingo.Extensions.Api
{
    public static class FormsExtensions
    {
        public static Collection AsCollection(this CreateCollectionForm form, string ownerId)
        {
            return new Collection
            {
                Id = Guid.NewGuid().ToString(),
                Name = form.Name,
                OwnerId = ownerId,
                DetailsId = Guid.NewGuid().ToString()
            };
        }

        public static CollectionDetails AsCollectionDetails(this CreateCollectionForm form, string detailsId,
            string baseLanguage, string secondLanguage)
        {
            return new CollectionDetails
            {
                Id = detailsId,
                BaseLanguage = baseLanguage,
                SecondLanguage = secondLanguage,
                Description = form.Description,
                PlayCount = 0,
                Rating = 0
            };
        }

        public static List<Card> GetNormalizedCards(this CreateCollectionForm form, Collection collection)
        {
            return form.Cards.Select(c => new Card
                {
                    Id = Guid.NewGuid().ToString(),
                    Collection = collection,
                    CollectionId = collection.Id,
                    Term = c.Term,
                    Definition = c.Definition
                }).ToList();
        }

        public static Set AsSet(this CreateSetForm form, string ownerId)
        {
            return new Set
            {
                Id = Guid.NewGuid().ToString(),
                Name = form.Name,
                OwnerId = ownerId
            };
        }
    }
}
