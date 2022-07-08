using InforceTask.BLL.DTOs;

namespace InforceTask.BLL.Interfaces
{
    public interface IUserService
    {
        Task AddAsync(CreateUserDTO entity);
    }
}