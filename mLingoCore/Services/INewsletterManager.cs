using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Newsletter;

namespace mLingoCore.Services
{
    public interface INewsletterManager
    {
        ApiResponse SignUp(RegisterForNewsletterForm form);
    }
}
