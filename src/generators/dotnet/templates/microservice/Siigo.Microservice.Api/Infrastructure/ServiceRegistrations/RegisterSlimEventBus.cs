using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Siigo.Core;
using Siigo.Core.Trace;
using Siigo.Core.Trace.abstracts;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Options;
using Siigo.Kafka.Auth;
using SlimMessageBus;
using SlimMessageBus.Host.AspNetCore;
using SlimMessageBus.Host.Config;
using SlimMessageBus.Host.Kafka;
using SlimMessageBus.Host.Serialization.Json;
using ConsumerConfig = Confluent.Kafka.ConsumerConfig;
using ProducerConfig = Confluent.Kafka.ProducerConfig;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterEventBus : IServiceRegistration
{
    private IConfiguration _configuration;
    private IOptions<KafkaOptions> _kafkaOptions;

    public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
    {
        _configuration = configuration;
        services.Configure<KafkaOptions>(configuration.GetSection(KafkaOptions.Section));

        _kafkaOptions = services.BuildServiceProvider()
            .GetRequiredService<IOptions<KafkaOptions>>();


        services.AddSingleton<ITracingEngine, TracingEngine>();
        services.AddSingleton(BuildMessageBus);
        services.AddSingleton<IRequestResponseBus>(svp => svp.GetService<IMessageBus>());
    }

    private IMessageBus BuildMessageBus(IServiceProvider serviceProvider)
    {
        var tracingEngine = serviceProvider.GetService<ITracingEngine>();
        tracingEngine?.OnMessageProduced(new Dictionary<string, object>());

        tracingEngine?.OnMessageArrived(new Dictionary<string, object>());

        Action<ProducerConfig> producerConfig = config =>
        {
            config.LingerMs = _kafkaOptions.Value.ProducerConfig!.LingerMs;
            config.SocketNagleDisable = _kafkaOptions.Value.ProducerConfig!.SocketNagleDisable;

            config.AddProducerSslAuth(_configuration);
        };

        Action<ConsumerConfig> consumerConfig = config =>
        {
            config.FetchErrorBackoffMs =
                int.Parse(
                    _kafkaOptions.Value.ConsumerConfig!.FetchErrorBackoffMs.ToString()
                );
            config.StatisticsIntervalMs =
                int.Parse(
                    _kafkaOptions.Value.ConsumerConfig!.StatisticsIntervalMs.ToString()
                );
            config.SocketNagleDisable =
                bool.Parse(
                    _kafkaOptions.Value.ConsumerConfig!.SocketNagleDisable.ToString()
                );
            config.SessionTimeoutMs =
                int.Parse(
                    _kafkaOptions.Value.ConsumerConfig!.SessionTimeoutMs.ToString()
                );
            config.MaxPollIntervalMs =
                int.Parse(
                    _kafkaOptions.Value.ConsumerConfig!.MaxPollIntervalMs.ToString()
                );

            config.AddConsumerSslAuth(_configuration);
        };

        return MessageBusBuilder
            .Create()
            .WithSerializer(new JsonMessageSerializer())
            .WithProviderKafka(
                new KafkaMessageBusSettings(_kafkaOptions.Value.BrokerUrl)
                {
                    ProducerConfig = producerConfig,
                    ConsumerConfig = consumerConfig
                })
            .Produce<IDomainEvent>(x =>
            {
                x.DefaultTopic(_kafkaOptions.Value.Topics!.ContractDomain);
                x.KeyProvider((@event, s) => Encoding.ASCII.GetBytes(@event.Id));
                x.AttachEvents(events =>
                {
                    // Invoke the action for the specified message type published/sent via the bus:
                    events.OnMessageProduced = (bus, producerSettings, message, name) => { Console.WriteLine(""); };
                });
            })
            .WithDependencyResolver(new AspNetCoreMessageBusDependencyResolver(serviceProvider))
            .Build();
    }
}
}

