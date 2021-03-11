using mLingoCore.Models.Session.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace mLingo.Models.Database.Sessions
{
    public class SessionData : SessionDataBase
    {
        [Required]
        public string Id { get; set; }

        public virtual Session Session { get; set; }
    }
}
