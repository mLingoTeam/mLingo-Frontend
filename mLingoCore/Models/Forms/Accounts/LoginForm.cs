﻿using System.ComponentModel.DataAnnotations;

namespace mLingoCore.Models.Forms.Accounts
{
    /// <summary>
    /// Data model that holds information that user submits when logging in
    /// </summary>
    public class LoginForm
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Password { get; set; }

        /// <summary>
        /// Validates if information contained in LoginFormModel is valid
        /// </summary>
        /// <param name="form">Form submitted by the user</param>
        /// <returns>If passed form is valid</returns>
        public static bool ValidateForm(LoginForm form)
        {
            if (string.IsNullOrEmpty(form.UserId) || string.IsNullOrEmpty(form.Password)) return false;
            return true;
        }
    }
}