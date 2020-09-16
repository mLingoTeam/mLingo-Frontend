using mLingoCore.Models.Api.Base;
using mLingoCore.Models.UserData;

namespace mLingoCore.Services
{
    public interface INewsletterManager
    {
        ApiResponse SignUp(EmailData form);
    }
}
