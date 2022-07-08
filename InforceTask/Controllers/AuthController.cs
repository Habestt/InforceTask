using InforceTask.BLL.DTOs;
using InforceTask.DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace InforceTask.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        public AuthController(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task Login(string username, string password, bool isPersistent)
        {
            await _signInManager.PasswordSignInAsync(username, password, isPersistent, false); 
        }

        [HttpPost("Signup")]
        public async Task SignUp(string username, string password, string fio)
        {
            var user = new User
            {
                UserName = username,
                Email = username                
            };

            var result = await _userManager.CreateAsync(user, password);
        }
    }
}
