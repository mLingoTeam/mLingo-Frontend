using mLingoCore.Models.UserData;

namespace mLingoCore.Models.Api.ResponseModels
{
    /// <summary>
    /// Response type that holds user credentials
    /// <remarks>
    /// Used in Account related requests
    /// </remarks>
    /// </summary>
    public class CredentialsResponse : UserInformationBase
    {
        /// <summary>
        /// Jwt token for further authorization
        /// </summary>
        
        public string Id { get; set; }

        public string Token { get; set; }

        public string Username { get; set; }
    }
}
