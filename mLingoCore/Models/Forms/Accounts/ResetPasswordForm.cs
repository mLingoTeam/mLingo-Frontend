using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.Forms.Accounts
{
    public class ResetPasswordForm
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
