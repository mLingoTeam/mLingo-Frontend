using System;
using mLingoCore.Models.UserData;

namespace mLingo.Models.Database.User
{
    /// <summary>
    /// Data class that holds all information about specific user.
    /// <remarks>
    /// Is foreign key in AppUser model.
    /// </remarks>
    /// </summary>
    public class UserInformation : UserInformationBase
    {
        public string Id { get; set; }

        public virtual AppUser User { get; set; }
    }
}
