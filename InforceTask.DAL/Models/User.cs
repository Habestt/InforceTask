using InforceTask.DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.DAL.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string UserName { get; set; }
        
        public string Email { get; set; }
        
        public string Password { get; set; }
        public virtual ICollection<URL> URLs { get; set; }

        [EnumDataType(typeof(Role))]
        public Role Role { get; set; }
    }
}
