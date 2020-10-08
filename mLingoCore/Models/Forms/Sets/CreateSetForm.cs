﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using mLingoCore.Models.FlashCards.Base;

namespace mLingoCore.Models.Forms.Sets
{
    /// <summary>
    /// Model for information required to create set
    /// </summary>
    public class CreateSetForm
    {
        [Required]
        public string Name { get; set; }

        public List<string> CollectionIds { get; set; }
    }
}
