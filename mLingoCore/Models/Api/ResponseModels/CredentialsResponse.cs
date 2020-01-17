using mLingoCore.Models.UserData;

namespace mLingoCore.Models.Api
{
    /// <summary>
    /// Response type that holds user credentials
    /// <remarks>
    /// Used in Account related requests
    /// </remarks>
    /// </summary>
    public class CredentialsResponse : UserInformation
    {
        /// <summary>
        /// Jwt token for further authorization
        /// </summary>
        public string Token { get; set; }

        public string Username { get; set; }
    }
}
