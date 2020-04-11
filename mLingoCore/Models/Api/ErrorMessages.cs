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
        public static string InvalidProp = "Invalid prop";
        public static string ChangeMailFail = "Failed to change email, please try again later";
        public static string ChangePasswordFail = "Failed to change password, please try again later";
        public static string ResetPasswordFail = "Failed to reset password, please try again later";
    }
}
