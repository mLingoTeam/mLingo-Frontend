using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using mLingo.Models.Database.Collections;

namespace mLingo.Models.Database.User
{
    /// <summary>
    /// Identity model of a user.
    /// </summary>
    public class AppUser : IdentityUser
    {
        public AppUser()
        {
            Collections = new List<Collection>();
        }

        public string? UserInformationId { get; set; }

        public UserInformation UserInformation { get; set; }

        public List<Collection> Collections { get; set; }
    }
}
