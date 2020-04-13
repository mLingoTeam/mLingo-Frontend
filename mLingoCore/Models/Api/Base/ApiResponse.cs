namespace mLingoCore.Models.Api.Base
{
    /// <summary>
    /// Standard response model for API calls
    /// </summary>
    public class ApiResponse
    {
        public int StatusCode { get; set; }

        public object Response { get; set; }

        public bool Successful { get; set; }

        /// <summary>
        /// Shortcut for status code only response
        /// </summary>
        /// <param name="statusCode">status code to return</param>
        /// <returns>Status code and empty body</returns>
        public static ApiResponse StatusCodeResponse(int statusCode) => new ApiResponse
        {
            Response = null,
            StatusCode = statusCode,
            Successful = statusCode >= 200 && statusCode < 300
        };

        /// <summary>
        /// Shortcut for standard error response
        /// </summary>
        /// <param name="errorMessage">Message for end user</param>
        /// <param name="statusCode">Response status code</param>
        /// <returns>Status code and <see cref="ErrorRapport"/> with error message in the body</returns>
        public static ApiResponse StandardErrorResponse(string errorMessage, int statusCode) => new ApiResponse
        {
            Response = new ErrorRapport
            {
                ErrorMessage = errorMessage
            },
            StatusCode = statusCode,
            Successful = false
        };

        /// <summary>
        /// Shortcut for server fault error
        /// </summary>
        /// <param name="errorMessage">Message for end user</param>
        /// <param name="stackTrace">Stack trace to improve communication</param>
        /// <param name="statusCode">Response status code</param>
        /// <returns>Status code and <see cref="ErrorRapport"/> with error message and stack trace in the body</returns>
        public static ApiResponse ServerExceptionResponse(string errorMessage, string stackTrace, int statusCode) =>
            new ApiResponse
            {
                Response = new ErrorRapport
                {
                    ErrorMessage = errorMessage,
                    StackTrace = stackTrace
                },
                StatusCode = statusCode,
                Successful = false
            };

        /// <summary>
        /// Shortcut for standard success response
        /// </summary>
        /// <param name="response">Response object to be serialized</param>
        /// <param name="statusCode">Response status code</param>
        /// <returns>Status code and serialized response object in the body</returns>
        public static ApiResponse StandardSuccessResponse(object response, int statusCode) => new ApiResponse
        {
            Response = response,
            StatusCode = statusCode,
            Successful = true
        };
    }
}