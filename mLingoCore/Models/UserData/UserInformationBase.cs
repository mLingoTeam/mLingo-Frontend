namespace mLingoCore.Models.UserData
{
    /// <summary>
    /// Base model for user information
    /// </summary>
    public class UserInformationBase
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DateOfBirth { get; set; }

        public int Age { get; set; }
    }
}
