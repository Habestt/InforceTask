using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.DAL.Models
{
    public class User : IdentityUser
    {
        public virtual ICollection<URL> URLs { get; set; }
    }
}
