using InforceTask.BLL.DTOs;
using InforceTask.BLL.Interfaces;
using InforceTask.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameStore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getAll")]
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userService.GetAllAsync();
        }

        [HttpGet("getById/{id}")]
        public async Task<User> GetById(int id)
        {
            return await _userService.GetByIdAsync(id);
        }

        [HttpPost("create")]
        public async Task Create([FromBody] CreateUserDTO entity)
        {
            try
            {
                await _userService.AddAsync(entity);
            }
            catch (ArgumentException ex)
            {
                BadRequest(ex.Message);
            }

        }

        [HttpDelete("deleteById/{id}")]
        public async Task Delete(int id)
        {
            await _userService.RemoveAsync(id);
        }

        [HttpPut("update")]
        public async Task Update([FromBody] UserDTO entity)
        {
            await _userService.UpdateAsync(entity);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task LoginAsync([FromBody] AuthDTO authDto)
        {
            try
            {
                var tokens = await _userService.LoginAsync(authDto);
                var user = await _userService.IsValidUserAsync(authDto.Email, authDto.Password);
            }
            catch (ArgumentException)
            {
                Unauthorized("Incorrect username or password!");
            }
            catch (OperationCanceledException)
            {
                Unauthorized("Invalid Attempt!");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("refresh")]
        public async Task RefreshToken([FromBody] TokenDTO tokensDto)
        {
            try
            {
                await _userService.RefreshTokenAsync(tokensDto);
            }
            catch (OperationCanceledException)
            {
                Unauthorized("Invalid attempt!");
            }
        }
    }
}
