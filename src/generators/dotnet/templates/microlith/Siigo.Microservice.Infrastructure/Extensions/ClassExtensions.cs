using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using System;
using System.Collections.Generic;
using System.Linq;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Extensions
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
        public static IEnumerable<TSource> FromHierarchy<TSource>(
            this TSource source,
            Func<TSource, TSource> nextItem,
            Func<TSource, bool> canContinue)
        {
            for (TSource current = source; canContinue(current); current = nextItem(current))
            {
                yield return current;
            }
        }

        public static IEnumerable<TSource> FromHierarchy<TSource>(
            this TSource source,
            Func<TSource, TSource> nextItem)
            where TSource : class
            => FromHierarchy(source, nextItem, s => s != null);

        /// <summary>
        /// Get All InnerException Messages in a single string
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public static string GetAllMessages(this Exception exception)
        {
            var messages = exception.FromHierarchy(ex => ex.InnerException).Select(ex => ex.Message);
            return string.Join($"{Environment.NewLine}   ", messages);
        }
    }
}
