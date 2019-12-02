﻿using System;

namespace mLingoCore.Models.Forms
{
    /// <summary>
    /// Model that holds data that user submits during registration for an account.
    /// </summary>
    public class RegisterFormModel
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
