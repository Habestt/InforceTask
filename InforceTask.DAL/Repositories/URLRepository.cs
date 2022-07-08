using InforceTask.DAL.Context;
using InforceTask.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.DAL.Repositories
{
    public class URLRepository : Repository<URL>
    {
        private readonly ApplicationDbContext _context;
        public URLRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
