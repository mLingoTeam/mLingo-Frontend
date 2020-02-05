using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.User;

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

        public virtual DbSet<UserInformation> UserInformation { get; set; }

        public virtual DbSet<Card> Cards { get; set; }

        public virtual DbSet<Collection> Collections { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasDefaultSchema("public");


        }
    }
}
