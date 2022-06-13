using Contract.V1;
using Google.Protobuf.Collections;
using Mapster;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterMapping : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            TypeAdapterConfig
                .GlobalSettings
                .Default
                .UseDestinationValue(member => member.SetterModifier == AccessModifier.None &&
                                               member.Type.IsGenericType &&
                                               member.Type.GetGenericTypeDefinition() == typeof(RepeatedField<>)
                );

            TypeAdapterConfig
                .GlobalSettings
                .EnableImmutableMapping();


            TypeAdapterConfig<ContractDebit, Domain.Aggregates.Contract.ContractDebit>
                .NewConfig()
                .MapWith(
                    contractDebit =>
                        Domain.Aggregates.Contract.ContractDebit.Instance(
                            ContractDebitAmount.Instance(contractDebit.Amount ?? 0),
                            ContractDebitStatus.Instance((ContractDebitStatusItem)contractDebit.Status,
                                ContractDebitStatusItem.None))
                    ,
                    true
                )
                //.MapToConstructor(true)
                .IgnoreNullValues(true);


            TypeAdapterConfig<Domain.Aggregates.Contract.ContractDebit, ContractDebit>
                .NewConfig()
                .MapWith(
                    contractDebit =>
                        new ContractDebit
                        {
                            Amount = contractDebit.Amount.Value,
                            Status = (uint)contractDebit.Status.Value
                        }
                    ,
                    true
                )
                //.MapToConstructor(true)
                .IgnoreNullValues(true);


            TypeAdapterConfig<Contract.V1.Contract, Domain.Aggregates.Contract.Contract>
                .NewConfig()
                .MapToConstructor(true)
                .IgnoreNullValues(true)
                .Ignore(contract => contract.OccurredAt);


            TypeAdapterConfig<Contract.V1.Contract, Domain.Aggregates.Contract.Contract>
                .NewConfig()
                .MapToConstructor(true)
                .IgnoreNullValues(true)
                .Ignore(contract => contract.OccurredAt);

            TypeAdapterConfig<Domain.Aggregates.Contract.Contract, Contract.V1.Contract>
                .NewConfig()
                .MapToConstructor(true);

            TypeAdapterConfig<FindContractByIdResponse, ContractQueryByIdResponse>
                .NewConfig()
                .MapToConstructor(true)
                .TwoWays()
                .Map(response => response.Contract, response => response.Contract);

            TypeAdapterConfig<FindContractsResponse, ContractsQueryResponse>
                .NewConfig()
                .MapToConstructor(true)
                .TwoWays()
                .Map(response => response.Contracts, response => response.Contracts);

            TypeAdapterConfig
                .GlobalSettings
                .Compile();
        }
    }
}