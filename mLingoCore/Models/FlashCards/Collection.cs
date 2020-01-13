using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using mLingoCore.Models.UserData;

namespace mLingoCore.Models.FlashCards
{
    public class Collection
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        [ForeignKey("OwnerId")]
        public UserInformation UserInformation { get; set; }

        public Guid OwnerId { get; set; }
    }
}                                                                                                                                                                                                                                                                                                               
