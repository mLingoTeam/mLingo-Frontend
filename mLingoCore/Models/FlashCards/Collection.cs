using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using mLingoCore.Models.FlashCards.Base;
using mLingoCore.Models.UserData;

namespace mLingoCore.Models.FlashCards
{
    public class Collection : CollectionBase
    {
        [Key]
        public Guid Id { get; set; }
    }
}                                                                                                                                                                                                                                                                                                               
