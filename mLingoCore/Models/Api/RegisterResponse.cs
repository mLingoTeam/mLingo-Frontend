using mLingoCore.Models.UserData;

namespace mLingoCore.Models.Api
{
    public class RegisterResponse : UserInformation
    {
        public string Token { get; set; }
    }
}
