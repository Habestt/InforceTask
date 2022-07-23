using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InforceTask.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace InforceTask.DAL.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }        
        public DbSet<URL> URLs { get; set; }

        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {            
            modelBuilder.Entity<User>().HasData(
                new User {
                    Id = 1,
                    UserName = "admin",
                    Password = "admin",
                    Email = "pashaprujma@gmail.com",
                    Role = Enums.Role.Administrator,
                });
                         

        }
    }
}
