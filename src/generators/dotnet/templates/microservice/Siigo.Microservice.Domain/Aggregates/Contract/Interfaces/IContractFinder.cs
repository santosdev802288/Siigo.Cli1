using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces
{
    public interface IContractFinder<T>
    {
        public Task<T> SelectByIdAsync(Guid contractId);
        public Task<IEnumerable<T>> SelectAsync();
    }
}