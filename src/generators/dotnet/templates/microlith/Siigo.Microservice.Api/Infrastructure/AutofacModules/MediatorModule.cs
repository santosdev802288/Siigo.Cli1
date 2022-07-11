using System.Reflection;
using Autofac;
using MediatR;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;

using Module = Autofac.Module;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.AutofacModules
{
    /// <summary>
    /// Register all necessary dependencies for the MediatR library
    /// </summary>
    public class MediatorModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Parte de esto lo podemos ignorar si registramos con IServiceCollection.AddMediatR(...)
            _ = builder.RegisterAssemblyTypes(typeof(IMediator).GetTypeInfo().Assembly)
                .AsImplementedInterfaces();

            _ = builder.Register<ServiceFactory>(context =>
            {
                IComponentContext componentContext = context.Resolve<IComponentContext>();
                return t => { return componentContext.TryResolve(t, out object o) ? o : null; };
            });

            // Add Command Validations
            _ = builder.RegisterGeneric(typeof(RequestValidationBehavior<,>)).As(typeof(IPipelineBehavior<,>));

        }
    }
}
