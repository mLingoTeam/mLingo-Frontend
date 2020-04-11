using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using mLingo.Models.Database.User;
using Microsoft.Extensions.Configuration;

namespace mLingo.Extensions.App
{
    public static class ApplicationBuilderExtension
    {
        public static async Task UseDefaultMlingoRoles(this IApplicationBuilder app, IServiceProvider provider)
        {
            var roleManager = provider.GetRequiredService<RoleManager<IdentityRole>>();
            string[] roleNames = {"Admin", "Member"};
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }

        public static async Task UseMlingoSuperUser(this IApplicationBuilder app, IServiceProvider provider,
            IConfiguration configuration)
        {
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();

            var user = new AppUser
            {
                UserName = configuration["SuperUser:username"],
                Email = "admin@mlingo.com",
                PhoneNumber = "000000000",
                UserInformation = new UserInformation
                {
                    FirstName = "admin",
                    LastName = "admin",
                    Id = Guid.NewGuid().ToString(),
                    DateOfBirth = "1948-01-01",
                    Age = 0
                }
            };

            var adminUser = await userManager.FindByEmailAsync("admin@mlingo.com");

            if (adminUser == null)
            {
                var res = await userManager.CreateAsync(user, configuration["SuperUser:password"]);
                if (res.Succeeded)
                {
                    var result = await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}
