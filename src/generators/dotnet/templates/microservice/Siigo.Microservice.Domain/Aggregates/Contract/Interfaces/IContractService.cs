using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces
{
    public interface IContractService<T>
    {
        public Task InsertAsync(T entity);
        public Task UpdateAsync(T entity);
        public Task DeleteAsync(Guid contractId);
        public Task<T> SelectByIdAsync(string contractId);
        public Task<IEnumerable<T>> SelectAsync();
    }
}