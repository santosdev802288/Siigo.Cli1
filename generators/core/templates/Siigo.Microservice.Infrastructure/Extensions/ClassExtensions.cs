using Siigo.<%= config.nameCapitalize %>.Domain.Exception;

namespace Siigo.<%= config.nameCapitalize %>.Infrastructure.Extensions
{
    /// <summary>
    /// 
    /// </summary>
    public static class ClassExtensions
    {
        /// <summary>
        ///  Check any instance is Null
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool IsNull(this object obj)
        {
            return (obj is null);
        }
        
        /// <summary>
        /// Check any instance is not null
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool IsNotNull(this object obj)
        {
            return !(obj is null);
        }
        
        
        /// <summary>
        /// Check any instance is not null
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static object ThrowNotFoundIfNull(this object obj, string message)
        {
           if (obj is null)
           {
               throw new NotFoundException(message);
           }

           return obj;
        }
        
        /// <summary>
        /// Check any instance is not null
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        public static object ThrowNotFoundIfZero(this int number, string message)
        {
            if (number == 0)
            {
                throw new NotFoundException(message);
            }
            return number;
        }
    }
}
