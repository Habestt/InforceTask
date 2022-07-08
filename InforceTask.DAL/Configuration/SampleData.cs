using InforceTask.DAL.Context;
using InforceTask.DAL.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.DAL.Configuration
{
    public static class SampleData
    {
        public static async void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<User>>();
                await SeedData(context, userManager);
            }
        }

        public static async Task SeedData(ApplicationDbContext context, UserManager<User> userManager)
        {
            context.Database.Migrate();

            #region Create admin
            User u1 = new User()
            {
                Id = "19f2bf43-cd00-4dbc-ab4d-7be0cdad7769",
                UserName = "admin",
                Email = "pashaprujma@gmail.com",
                EmailConfirmed = true,
                NormalizedEmail = "PASHAPRUJMA@GMAIL.COM",
                NormalizedUserName = "ADMIN"
            };
            #endregion

            #region Create roles
            string[] roles = new string[] { "admin", "user" };
            #endregion

            var roleStore = new RoleStore<IdentityRole>(context);            
                
            if (!context.Users.Any(u => u.UserName == u1.UserName))
            {
                foreach (string role in roles)
                {
                    await roleStore.CreateAsync(new IdentityRole(role) { NormalizedName = role.ToUpper() });
                }

                var password = new PasswordHasher<User>();
                var hashed = password.HashPassword(u1, "11111111");
                u1.PasswordHash = hashed;
                var result = await userManager.CreateAsync(u1);
                await userManager.AddToRoleAsync(u1, "admin");
                context.SaveChanges();
            }

        }
    }
}
