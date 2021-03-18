using MatthiWare.CommandLine.Core.Attributes;

namespace Siigo.<%= config.nameCapitalize %>.Sync
{
  public class ProgramOptions
{
    [Name("t", "top"), Description("Cantidad maxima de registros"), DefaultValue(0)]
    public int Top { get; set; }

    [Name("tid", "tid"), Description("TenantID of the company"), DefaultValue("")]
    public string TenantID { get; set; }

    [Name("env", "env"), Description("The environment"), DefaultValue("")]
    public string Environment { get; set; }

    [Name("mt", "mt"), Description("MultitenantID"), DefaultValue("0")]
    public string MultitenantID { get; set; }

    [Name("sp", "sp"), Description("ServerPriority"), DefaultValue("0")]
    public string ServerPriority { get; set; }

    [Name("conn", "conn"), Description("Connection String"), DefaultValue(""), Required()]
    public string Connection { get; set; }

    public override string ToString()
    {
        return $"Top: {Top}\nTenantID: {TenantID}";
    }

}
}