using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using mLingoCore.Models.Api.Base;

namespace mLingo.Extensions.Api
{
    public static class ControllerExtensions
    {
        public static IActionResult HandleManagerResponse(this Controller controller, KeyValuePair<ApiResponse, int> res)
        {
            if (res.Key == null) return controller.StatusCode(res.Value);
            return controller.StatusCode(res.Value, res.Key);
        }
    }
}
