namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Dto
{
    public class RequestDto
    {
        public int Id { get; set; }
        public string Message { get; set; }
    }
}