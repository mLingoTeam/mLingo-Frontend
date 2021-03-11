using System;
using System.Collections.Generic;
using System.Text;

namespace mLingoCore.Models.Api.ResponseModels
{
    public class SessionDataResponse
    {
        public int TotalCorrect { get; set; }

        public int TotalMistakes { get; set; }
    }
}
