using mLingoCore.Models.Session;
using System;
using System.Collections.Generic;
using System.Text;

namespace mLingoCore.Models.Forms.Session
{
    public class SubmitSessionForm
    {
        public string SessionId { get; set; }

        public List<CardReview> Reviews { get; set; }
    }
}
