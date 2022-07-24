using Autofac;
using InforceTask.BLL.Interfaces;
using InforceTask.BLL.Services;
using InforceTask.DAL.Interfaces;
using InforceTask.DAL.Models;
using InforceTask.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.BLL.Configurations.Autofac
{
    public class Container : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<URLRepository>().As<IRepository<URL>>().SingleInstance();
            builder.RegisterType<UserRepository>().As<IRepository<User>>().SingleInstance();
            builder.RegisterType<UserRefreshTokenRepository>().As<IRepository<UserRefreshToken>>().SingleInstance();
            builder.RegisterType<URLService>().As<IURLService>().SingleInstance();
            builder.RegisterType<UserService>().As<IUserService>().SingleInstance();
        }
    }
}
