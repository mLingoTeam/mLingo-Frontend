namespace mLingoCore.Models.Forms
{
    public class LoginFormModel
    {
        public string UserId { get; set; }

        public string Password { get; set; }

        public static bool ValidateForm(LoginFormModel form)
        {
            if (string.IsNullOrEmpty(form.UserId) || string.IsNullOrEmpty(form.Password)) return false;
            return true;
        }
    }
}
