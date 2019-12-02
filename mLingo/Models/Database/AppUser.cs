using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using mLingoCore.Models.UserData;

namespace mLingo.Models.Database
{
    public class AppUser : IdentityUser
    {
        
        public Guid UserInfoFk { get; set; }

        [ForeignKey("UserInfoFk")]
        public UserInformation UserInfo { get; set; }
    }
}
