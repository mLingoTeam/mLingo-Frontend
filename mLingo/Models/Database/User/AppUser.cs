using Microsoft.AspNetCore.Identity;

namespace mLingo.Models.Database.User
{
    /// <summary>
    /// Identity model of a user.
    /// </summary>
    public class AppUser : IdentityUser
    {
        public string UserInformationId { get; set; }

        public virtual UserInformation UserInformation { get; set; }
    }
}
