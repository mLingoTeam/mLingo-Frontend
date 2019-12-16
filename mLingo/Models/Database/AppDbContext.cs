using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using mLingoCore.Models.UserData;

namespace mLingo.Models.Database
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        #region MyRegion
        /// <summary>
        /// Default constructor, expecting database options passed in
        /// </summary>
        /// <param name="options">The database context options</param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        #endregion

        #region DbSets

        public DbSet<UserInformation> UserInformation { get; set; }

        public DbSet<> Cards { get; set; }

        #endregion
    }
}
