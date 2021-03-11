using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace mLingoCore.Models.Session.Base
{
    public class SessionDataBase
    {
        [Required]
        public string SessionId { get; set; }

        public int TotalCorrect { get; set; }

        public int TotalMistakes { get; set; }
    }
}
