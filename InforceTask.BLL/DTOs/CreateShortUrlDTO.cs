using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.BLL.DTOs
{
    public class CreateShortUrlDTO
    {
        public string OriginalUrl { get; set; }
        public int UserId { get; set; }
    }
}
