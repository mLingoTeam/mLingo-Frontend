using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using mLingoCore.Models.UserData;

namespace mLingo.Models.Database
{
    /// <summary>
    /// Identity model of a user.
    /// </summary>
    public class AppUser : IdentityUser
    {
        
        public Guid UserInfoFk { get; set; }

        [ForeignKey("UserInfoFk")]
        public UserInformation UserInformation { get; set; }
    }
}
