using System;
using mLingoCore.Models.FlashCards.Base;
using mLingoCore.Models.Forms.Collections;

namespace mLingo.Models.Database.Collections
{
    /// <summary>
    /// Database model representing single learning card stored in any <see cref="Collection"/>
    /// </summary>
    public class Card : CardBase
    {
        #region Constructors

        public Card()
        {

        }

        public Card(CardUpdateModel card)
        {
            Term = card.Term;
            Definition = card.Definition;
            Id = card.Id ?? Guid.NewGuid().ToString();
        }

        #endregion

        #region PublicFields

        public string Id { get; set; }
        public virtual Collection Collection { get; set; }

        #endregion

        #region Methods

        public bool IsUpdateNeeded(Card otherCard)
        {
            return !(Term == otherCard.Term && Definition == otherCard.Definition);
        }

        #endregion
    }
}
