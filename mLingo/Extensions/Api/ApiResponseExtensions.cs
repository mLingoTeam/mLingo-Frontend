using System.Collections.Generic;
using mLingoCore.Models.Api.Base;

namespace mLingo.Extensions.Api
{
    public static class ApiResponseExtensions
    {
        public static KeyValuePair<ApiResponse, int> WithStatusCode(this ApiResponse res, int code) => new KeyValuePair<ApiResponse, int>(res, code);

        public static KeyValuePair<ApiResponse, int> StatusCodeOnly(int code) => new KeyValuePair<ApiResponse, int>(null, code);

    }
}
