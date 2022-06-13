using System;
using System.Threading.Tasks;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces
{
    public interface IContractRepository<in T>
    {
        public Task InsertAsync(T entity);
        public Task UpdateAsync(T entity);
        public Task DeleteAsync(Guid id);
    }    
}

