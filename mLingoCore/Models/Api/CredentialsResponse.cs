using mLingoCore.Models.UserData;

namespace mLingoCore.Models.Api
{
    public class CredentialsResponse : UserInformation
    {
        public string Token { get; set; }
    }
}
