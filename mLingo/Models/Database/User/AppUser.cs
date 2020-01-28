using System;
using Microsoft.AspNetCore.Identity;
using mLingo.Models.Database.User;

namespace mLingo.Models.Database
{
    /// <summary>
    /// Identity model of a user.
    /// </summary>
    public class AppUser : IdentityUser
    {
        public int UserInfoFk { get; set; }

        public virtual UserInformation UserInformation { get; set; }
    }
}
