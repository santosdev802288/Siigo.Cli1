using System;
using MongoDB.Bson.Serialization.Attributes;

using Siigo.Core.SeedWork;


namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.ReadModels
{
    public class ExampleModel : IDto
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Message { get; set; }
        public DateTime AddedOn { get; set; }
    }

}