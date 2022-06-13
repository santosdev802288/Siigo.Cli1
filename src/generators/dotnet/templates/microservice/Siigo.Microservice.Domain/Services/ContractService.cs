using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Services
{
    public class ContractService : IContractService<Contract>
    {
        private readonly IDomainEventBus _domainEventBus;
        private readonly IContractFinder<Contract> _entityContractFinder;
        private readonly IContractRepository<Contract> _entityContractRepository;


        public ContractService(IContractRepository<Contract> entityContractRepository,
            IContractFinder<Contract> entityContractFinder, IDomainEventBus domainEventBus)
        {
            _domainEventBus = domainEventBus;
            _entityContractRepository = entityContractRepository;
            _entityContractFinder = entityContractFinder;
        }

        public Task<Contract> SelectByIdAsync(string contractId)
        {
            return _entityContractFinder.SelectByIdAsync(new Guid(contractId));
        }

        public Task<IEnumerable<Contract>> SelectAsync()
        {
            return _entityContractFinder.SelectAsync();
        }

        public async Task InsertAsync(Contract entity)
        {
            await _entityContractRepository.InsertAsync(entity);

            await _domainEventBus.Publish(entity);
        }

        public async Task UpdateAsync(Contract entity)
        {
            var contract = await SelectByIdAsync(entity.Id.ToString());
            if (contract.Email != entity.Email)
                entity.ChangeEmail(entity.Email);

            if (contract.Debit.Status.Value != entity.Debit.Status.Value)
                entity.ChangeDebitStatus(entity.Debit.Status.Value, contract.Debit.Status.Value);


            if (Math.Abs(contract.Debit.Amount.Value - entity.Debit.Amount.Value) > 0)
                entity.ChangeDebitAmount(entity.Debit.Amount.Value);


            await _entityContractRepository.UpdateAsync(entity);

            await _domainEventBus.Publish(entity);
        }

        public Task DeleteAsync(Guid contractId)
        {
            return _entityContractRepository.DeleteAsync(contractId);
        }
    }
}