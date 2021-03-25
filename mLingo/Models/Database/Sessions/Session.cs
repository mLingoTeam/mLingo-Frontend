﻿using mLingo.Models.Database.Collections;
using mLingo.Models.Database.User;
using mLingoCore.Models.Session.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace mLingo.Models.Database.Sessions
{
    public class Session : SessionBase
    {

        public Session()
        {
        }

        public string Id { get; set; }

        public string DetailsId { get; set; }

        public virtual SessionData SessionData { get; set; }

        public virtual Collection Collection { get; set; }

        public virtual AppUser Owner { get; set; }
    }
}