namespace mLingoCore.Models.Api
{
    /// <summary>
    /// Data class for static error messages
    /// </summary>
    public class ErrorMessages
    {
        public static string InvalidRegistration = "Please provide all required details in order to create an account!";
        public static string InvalidLogin = "Please enter correct login credentials!";
        public static string UsernameNotFound = "User with entered name does not exist!";
        public static string UserEmailNotFound = "User with entered e-mail does not exist!";
        public static string NoSuchCollection = "Collection not found";
        public static string InvalidQuery = "Invalid query parameters";
        public static string DbError = "Database query error";
        public static string SetNotFound = "Set not found";
    }
}
