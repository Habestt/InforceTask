using InforceTask.BLL.Configurations.AutoMapper;
using InforceTask.BLL.DTOs;
using InforceTask.BLL.Interfaces;
using InforceTask.DAL.Interfaces;
using InforceTask.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task AddAsync(CreateUserDTO entity)
        {
            var dbUser = await _userRepository.FindFirstAsync(expression: x => x.Email == entity.Email || x.UserName == entity.UserName);
            if (dbUser is null)
            {
                await _userRepository.AddAsync(AutoMapper<CreateUserDTO, User>.Map(entity));
            }
        }
    }
}
