using System;

namespace mLingoCore.Models.Forms
{
    public class RegisterFormModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DateOfBirth { get; set; }

        public string PhoneNo { get; set; }


        public static bool ValidateForm(RegisterFormModel form)
        {
            if (string.IsNullOrEmpty(form.Username) ||
                string.IsNullOrEmpty(form.Password) ||
                string.IsNullOrEmpty(form.Email) ||
                string.IsNullOrEmpty(form.FirstName) ||
                string.IsNullOrEmpty(form.LastName) ||
                string.IsNullOrEmpty(form.PhoneNo) ||
                string.IsNullOrEmpty(form.DateOfBirth)) return false;
            return true;
        }
    }
}
