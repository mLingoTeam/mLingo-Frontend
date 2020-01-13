using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using mLingoCore.Models.FlashCards;
using mLingoCore.Models.UserData;

namespace mLingo.Models.Database
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        #region Constructor
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

        public DbSet<Card> Cards { get; set; }

        public DbSet<Collection> Collections { get; set; }

        #endregion
    }
}
