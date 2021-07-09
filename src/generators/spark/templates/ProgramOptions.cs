using MatthiWare.CommandLine.Core.Attributes;

namespace Siigo.Ms<%= config.nameUpper %>.Sync
{
  public class ProgramOptions
  {
    [Name("t", "top"), Description("Cantidad maxima de registros"), DefaultValue(0)]
    public int Top { get; set; }

    [Name("tid", "tenantid"), Description("TenantID de una empresa"), DefaultValue("")]
    public string TenantID { get; set; }

    public override string ToString()
    {
      return $"Top: {Top}\nTenantID: {TenantID}";
    }

  }
}