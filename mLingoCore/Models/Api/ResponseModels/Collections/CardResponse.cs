using System;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Api.ResponseModels.Collections
{
    public class CardResponse : CardBase
    {
        public Guid Id { get; set; }
    }
}
