using Microsoft.AspNetCore.Mvc;
using mLingoCore.Models.Api.Base;

namespace mLingo.Extensions.Api
{
    public static class ControllerExtensions
    {
        public static IActionResult HandleManagerResponse(this Controller controller, ApiResponse res)
        {
            if (res.Response == null) return controller.StatusCode(res.StatusCode);
            return controller.StatusCode(res.StatusCode, res);
        }
    }
}
