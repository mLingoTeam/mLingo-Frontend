using System;
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

            // AppUser 1:1 relation with UserInformation
            builder.Entity<AppUser>().HasKey(t => t.Id);
            builder.Entity<AppUser>()
                .HasOne(t => t.UserInformation)
                .WithOne(t => t.User);


            // Collection 1:many relation with AppUser
            builder.Entity<Collection>().HasKey(t => t.Id);
            builder.Entity<Collection>()
                .HasOne(t => t.Owner)
                .WithMany(t => t.Collections)
                .HasForeignKey(t => t.OwnerId);

            // Card 1:many relation with Collection
            builder.Entity<Card>().HasKey(t => t.Id);
            builder.Entity<Card>()
                .HasOne(t => t.Collection)
                .WithMany(t => t.Cards)
                .HasForeignKey(t => t.CollectionId);

            builder.Entity<UserInformation>().ToTable("UserInformation");
            builder.Entity<Collection>().ToTable("Collections");
            builder.Entity<Card>().ToTable("Cards");
        }
    } 
}
