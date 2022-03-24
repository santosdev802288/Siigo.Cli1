using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Siigo.Core.Trace;
using Siigo.Core.Trace.abstracts;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Consumer;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Dto;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using SlimMessageBus;
using SlimMessageBus.Host.AspNetCore;
using SlimMessageBus.Host.Config;
using SlimMessageBus.Host.Kafka;
using SlimMessageBus.Host.Serialization.Json;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterEventBus : IServiceRegistration
    {
        private IConfiguration _configuration;

        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            _configuration = configuration;

            services.AddSingleton<ITracingEngine, TracingEngine>();
            services.AddSingleton(BuildMessageBus);
            services.AddSingleton<IRequestResponseBus>(svp => svp.GetService<IMessageBus>());

            services.AddSingleton<RequestConsumer>();
        }

        private IMessageBus BuildMessageBus(IServiceProvider serviceProvider)
        {
            var tracingEngine = serviceProvider.GetService<ITracingEngine>();
            var onMessageProduced = tracingEngine?.OnMessageProduced(new Dictionary<string, object>
            {
                // {"siigo", "tech"}
            });

            var onMessageArrived = tracingEngine?.OnMessageArrived(new Dictionary<string, object>
            {
                // {"siigo", "tech"}
            });
            var kafkaProducerConfig = _configuration.GetSection("kafka:producerConfig");
            var kafkaConsumerConfig = _configuration.GetSection("kafka:consumerConfig");
            IConfigurationSection groups = _configuration.GetSection("kafka:groups");
            IConfigurationSection topics = _configuration.GetSection("kafka:topics");

            return MessageBusBuilder
                .Create()
                .WithSerializer(new JsonMessageSerializer())
                .WithProviderKafka(new KafkaMessageBusSettings(_configuration.GetSection("kafka").GetSection("brokerUrl").Value)
                {
                    ProducerConfig = (config) =>
                    {
                        config.LingerMs = Double.Parse(kafkaProducerConfig.GetSection("LingerMs").Value);
                        config.SocketNagleDisable = bool.Parse(kafkaProducerConfig.GetSection("socket.nagle.disable").Value);
                    },
                    ConsumerConfig = (config) =>
                    {
                        config.FetchErrorBackoffMs = Int32.Parse(kafkaConsumerConfig.GetSection("fetch.error.backoff.ms").Value);
                        config.StatisticsIntervalMs = Int32.Parse(kafkaConsumerConfig.GetSection("statistics.interval.ms").Value);
                        config.SocketNagleDisable = bool.Parse(kafkaConsumerConfig.GetSection("socket.nagle.disable").Value);
                        config.SessionTimeoutMs = Int32.Parse(kafkaConsumerConfig.GetSection("SessionTimeoutMs").Value);
                        config.MaxPollIntervalMs = Int32.Parse(kafkaConsumerConfig.GetSection("MaxPollIntervalMs").Value);
                    }
                })
                .Consume<RequestDto>(x => x
                    .Topic(topics.GetSection("product_domain").Value)
                    .WithConsumer<RequestConsumer>()
                    .KafkaGroup(groups.GetSection("product_domain").Value)
                )
                // Si se produce el envio de un evento, configurar y retirar los comentarios de las siguientes lineas
                // a continuación un ejemplo:
                // .Produce<AccountIntegrationEvent>(x =>
                // {
                //     x.DefaultTopic(_configuration["AutocompleteThirdPartyTopic"]);
                //     x.AttachEvents(events =>
                //     {
                //         // Invoke the action for the specified message type published/sent via the bus:
                //         events.OnMessageProduced = (bus, producerSettings, message, name) =>
                //         {
                //         };
                //     });
                // })
                
                .WithDependencyResolver(new AspNetCoreMessageBusDependencyResolver(serviceProvider))
                .Build();
        }
    }
}
