using InforceTask.DAL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.BLL.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        
        public string Email { get; set; }

        public string Password { get; set; }       
       
        public Role Role { get; set; }
    }
}
