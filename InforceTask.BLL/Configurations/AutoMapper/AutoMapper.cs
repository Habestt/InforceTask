using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.BLL.Configurations.AutoMapper
{
    public static class AutoMapper<TSourse, TDestination>
    {
        public static TDestination Map(TSourse sourse)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<TSourse, TDestination>().ReverseMap());
            var mapper = config.CreateMapper();
            return mapper.Map<TDestination>(sourse);
        }
    }
}
