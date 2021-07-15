using Newtonsoft.Json;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Model;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork
{
    /// POCO Error Details ViewModel for errors
    public class ErrorResponse : IContract
    {
        public int Status { get; set; }
        public string Service { get; set; }
        public List<ErrorDetail> Errors { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class ErrorDetail
    {
        private string source;
        public string Source { get => source.Split(".").Last(); set => source = value; }
        public string Code { get; set; }
        public string Message { get; set; }
        public List<string> Params { get; set; }
        public string Detail { get; set; }

        public ErrorDetail()
        {
            Params = new List<string>();
            Source = Assembly.GetEntryAssembly().GetName().Name;
        }
    }
}
