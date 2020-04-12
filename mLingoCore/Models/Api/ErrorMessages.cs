namespace mLingoCore.Models.Api
{
    /// <summary>
    /// Data class for static error messages
    /// </summary>
    public class ErrorMessages
    {
        public struct AccountManager
        {
            public static string InvalidRegistrationCredentials { get; set; } =
                "Please provide all required details to create an account";

            public static string InvalidLoginCredentials { get; set; } =
                "Incorrect login or password";

            public static string InvalidChangeToken { get; set; } =
                "Invalid token, it might have expired. Please try to issue new one.";

            public static string UserNotFound(string query) => $"User: {query}, does not exist";

            public static string ActionFail(string action) => $"Failed to {action}, please try again later";
        }

        public struct CollectionsManager
        {
            public static string CollectionNotFound(string query) => $"Collection: {query}, does not exist";

            public static string UserHasNoCollections => "You have no collections";

            public static string ActionFail(string action) => $"Failed to {action} collection. Please try again later";
        }

        public struct SetsManager
        {
            public static string SetNotFound(string query) => $"Set: {query}, does not exist";

            public static string ActionFail(string action) => $"Failed to {action} set";

            public static string UserHasNoSets => "You have no sets";
        }

        public struct Server
        {
            public static string ActionFail(string action) =>
                $"Failed to {action}. This is just our internal problem. Please report your issues to support@mlingo.com";
        }
    }
}
