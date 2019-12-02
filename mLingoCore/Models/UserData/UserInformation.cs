using System;
using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.UserData
{
    /// <summary>
    /// Data class that holds all information about specific user.
    /// <remarks>
    /// Is foreign key in AppUser model.
    /// </remarks>
    /// </summary>
    public class UserInformation
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(256)]
        public string FirstName { get; set; }

        [MaxLength(256)]
        public string LastName { get; set; }

        public string DateOfBirth { get; set; }

        public int Age { get; set; }
    }
}
