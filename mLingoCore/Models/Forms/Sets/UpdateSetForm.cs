using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.Forms.Sets
{
    public class UpdateSetForm 
    {
        public string Name { get; set; }

        [Required]
        public List<string> CollectionIds { get; set; }
    }
}
