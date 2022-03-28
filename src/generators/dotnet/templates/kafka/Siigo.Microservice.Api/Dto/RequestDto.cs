using System;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Dto
{
    public class RequestDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
    }
}