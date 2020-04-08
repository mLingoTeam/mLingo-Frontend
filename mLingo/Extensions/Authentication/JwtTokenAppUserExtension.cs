using System;
using System.Data.Entity.Core.Metadata.Edm;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using mLingo.Models.Database.User;

namespace mLingo.Extensions.Authentication
{
    /// <summary>
    /// Extension methods for working with Jwt bearer tokens
    /// </summary>
    public static class JwtTokenExtensionMethods
    {
        /// <summary>
        /// Generates a Jwt bearer token containing the users username
        /// </summary>
        /// <param name="user">The users details</param>
        /// <returns></returns>
        public static string GenerateJwtToken(this AppUser user, IConfiguration configuration)
        {
            
            // Set our tokens claims for member
            var memberClaims = new[]
            {
                // Unique ID for this token
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName), 

                // The username using the Identity name so it fills out the HttpContext.User.Identity.Name value
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),

                // Add user Id so that UserManager.GetUserAsync can find the user based on Id
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                
            };

            // Set token claims for admin
            var adminClaims = new[]
            {
                new Claim(ClaimTypes.Role, "admin")
            };
            Array.Copy(memberClaims, adminClaims, memberClaims.Length);


            var isAdmin = user.Email.Equals("admin@mlingo.com");

            // Create the credentials used to generate the token
            var credentials = new SigningCredentials(
                // Get the secret key from configuration
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:JwtSecretKey"])),
                // Use HS256 algorithm
                SecurityAlgorithms.HmacSha256);

            // Generate the Jwt Token
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:JwtIssuer"],
                audience: configuration["Jwt:JwtAudience"],
                claims: isAdmin ? adminClaims : memberClaims,
                signingCredentials: credentials,
                expires: DateTime.Now.AddHours(3)
            );

            // Return the generated token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
