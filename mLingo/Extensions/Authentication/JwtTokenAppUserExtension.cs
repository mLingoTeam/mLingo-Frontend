using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
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
        public static async Task<string> GenerateJwtToken(this AppUser user, UserManager<AppUser> userManager, IConfiguration configuration)
        {

            var userRoles = await userManager.GetRolesAsync(user); 

            // Set our tokens claims for member
            var claims = new List<Claim>
            {
                // Unique ID for this token
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName), 

                // The username using the Identity name so it fills out the HttpContext.User.Identity.Name value
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),

                // Add user Id so that UserManager.GetUserAsync can find the user based on Id
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            // Add role claims
            claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

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
                claims: claims,
                signingCredentials: credentials,
                expires: DateTime.Now.AddMinutes(1)og
            );

            // Return the generated token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
