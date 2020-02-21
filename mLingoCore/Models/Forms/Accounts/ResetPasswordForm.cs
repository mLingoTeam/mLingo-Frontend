namespace mLingoCore.Models.Forms.Accounts
{
    public class ResetPasswordForm
    {
        public ResetPasswordForm()
        {
            
        }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}
