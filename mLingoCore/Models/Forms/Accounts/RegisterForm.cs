namespace mLingoCore.Models.Forms.Accounts
{
    /// <summary>
    /// Model that holds data that user submits during registration for an account.
    /// </summary>
    public class RegisterForm
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DateOfBirth { get; set; }

        public string PhoneNo { get; set; }


        /// <summary>
        /// Validates if data inside any registration form is valid
        /// </summary>
        /// <param name="form">Form submitted by user</param>
        /// <returns>If user form is valid</returns>
        public static bool ValidateForm(RegisterForm form)
        {
            return !string.IsNullOrEmpty(form.Username) && !string.IsNullOrEmpty(form.Password) && !string.IsNullOrEmpty(form.Email);
        }
    }
}
