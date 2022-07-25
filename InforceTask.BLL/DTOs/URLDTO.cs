using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.BLL.DTOs
{
    public class URLDTO
    { 
        public int Id { get; set; }
        public string ShortUrl { get; set; }
        public string OriginalUrl { get; set; }

        public string CreatedByUserName { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
