using AngularApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApi.Context
{
    public class AppDbContext:DbContext
    
    {
        public AppDbContext( DbContextOptions<AppDbContext> options) :base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<Leave> Leaves { get; set; }

        public DbSet<Performance> Performances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Company>().ToTable("companies");
            modelBuilder.Entity<Department>().ToTable("departments");
            modelBuilder.Entity<Leave>().ToTable("leaves");
            modelBuilder.Entity<Performance>().ToTable("performances").Property(b=>b.Date).HasDefaultValue(DateTime.Now);
        }

        internal Task saveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
