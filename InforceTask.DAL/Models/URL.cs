using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.DAL.Models
{
    public class URL
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string OriginalUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("User")]
        public int UserId { get; set; }
    }
}
