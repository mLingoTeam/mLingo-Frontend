using mLingo.Models.Database.User;
using mLingoCore.Models.Api.ResponseModels;

namespace mLingo.Extensions.Authentication
{
    public static class UserExtensions
    {
        public static CredentialsResponse Credentials(this AppUser user, string token)
        {
            return new CredentialsResponse
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.UserInformation.FirstName,
                LastName = user.UserInformation.LastName,
                DateOfBirth = user.UserInformation.LastName,
                Age = user.UserInformation.Age,
                Token = token
            };
        }

        public static CredentialsResponse CredentialsNoToken(this AppUser user)
        {
            return new CredentialsResponse
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.UserInformation.FirstName,
                LastName = user.UserInformation.LastName,
                DateOfBirth = user.UserInformation.LastName,
                Age = user.UserInformation.Age,
                Token = null
            };
        }
    }
}
