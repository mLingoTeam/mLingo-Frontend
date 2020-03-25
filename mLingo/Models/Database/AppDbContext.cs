using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using mLingo.Models.Database.Collections;
using mLingo.Models.Database.JoinTables;
using mLingo.Models.Database.Sets;
using mLingo.Models.Database.User;

namespace mLingo.Models.Database
{
    /// <summary>
    /// Entity framework core database context for mLingo application
    /// </summary>
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

        public virtual DbSet<CollectionDetails> CollectionDetails { get; set; }

        public virtual DbSet<Set> Sets { get; set; }

        public virtual DbSet<SetCollection> SetCollectionJoinTable { get; set; }

        #endregion

        #region Configuration

        /// <summary>
        /// Context configuration, lazy loader setup
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }

        #endregion

        #region ModelCreating

        /// <summary>
        /// FluentAPI code first database implementation
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasDefaultSchema("public");

            // AppUser 1:1 relation with UserInformation
            builder.Entity<AppUser>().HasKey(t => t.Id);
            builder.Entity<AppUser>()
                .HasOne(t => t.UserInformation)
                .WithOne(t => t.User)
                .OnDelete(DeleteBehavior.Cascade);


            // Collection 1:many relation with AppUser
            builder.Entity<Collection>().HasKey(t => t.Id);
            builder.Entity<Collection>()
                .HasOne(t => t.Owner)
                .WithMany(t => t.Collections)
                .HasForeignKey(t => t.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Collection 1:1 relation with CollectionDetails
            builder.Entity<CollectionDetails>().HasKey(t => t.Id);
            builder.Entity<Collection>()
                .HasOne(t => t.Details)
                .WithOne(t => t.Collection)
                .OnDelete(DeleteBehavior.Cascade);

            // Card 1:many relation with Collection
            builder.Entity<Card>().HasKey(t => t.Id);
            builder.Entity<Card>()
                .HasOne(t => t.Collection)
                .WithMany(t => t.Cards)
                .HasForeignKey(t => t.CollectionId)
                .OnDelete(DeleteBehavior.ClientNoAction);

            // Set many to many relation with Collection
            builder.Entity<SetCollection>().HasKey(t => new {t.SetId, t.CollectionId});
            builder.Entity<Set>().HasKey(t => t.Id);
            builder.Entity<SetCollection>()
                .HasOne(t => t.Set)
                .WithMany(t => t.Collections)
                .HasForeignKey(t => new {t.SetId, t.CollectionId})
                .OnDelete(DeleteBehavior.ClientNoAction);
            builder.Entity<SetCollection>()
                .HasOne(t => t.Collection)
                .WithMany(t => t.Sets)
                .HasForeignKey(t => new {t.SetId, t.CollectionId})
                .OnDelete(DeleteBehavior.ClientNoAction);

            // Create tables
            builder.Entity<UserInformation>().ToTable("UserInformation");
            builder.Entity<Collection>().ToTable("Collections");
            builder.Entity<Card>().ToTable("Cards");
            builder.Entity<CollectionDetails>().ToTable("CollectionDetails");
        }

        #endregion
    } 
}
