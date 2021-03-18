using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using Microsoft.Spark.Sql;
using Siigo.<%= config.nameCapitalize %>.Sync.Application.utils;

namespace Siigo.<%= config.nameCapitalize %>.Sync.Application.jobs
{
    public class Job
{
    private readonly IConfiguration _configuration;
    private readonly Cryptography _cryptography;
    private readonly string _cryptoGraphyPass = "SolsoftPassPhrase";

    public Job(IConfiguration configuration, Cryptography cryptography)
    {
        this._configuration = configuration;
        _cryptography = cryptography;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="options"></param>
    public void Sync(ProgramOptions options)
    {
        var tenantFilter = String.Empty;
        var topFilter = string.Empty;
        var MTIds = options.MultitenantID;
        var ServPriority = options.ServerPriority;
        var connection = options.Connection;

        if (options.Top > 0)
        {
            topFilter = $" TOP {options.Top} ";
        }

        if (options.TenantID.Trim() != "")
        {
            tenantFilter = $" AND TenantID = {options.TenantID}";
        }

        var spark = SparkSession
            .Builder()
            .AppName("<%= config.nameCapitalize %>Migration")
            .GetOrCreate();

        var connections = MultiTenantConnections(spark, MTIds, ServPriority);

        connections
            .Collect()
            .ToList()
            .ForEach(row =>
            {
                byte[] bytDecrypt = Convert.FromBase64String(
                    row.GetAs<string>("CloudMultitenantPassword") ?? throw new Exception("mt pwd not found"));
                var bytPk = new PasswordDeriveBytes(_cryptoGraphyPass, null).GetBytes(32);

                var mtPwd = _cryptography.Decrypt(bytDecrypt, bytPk);
                var mtName = row.GetAs<string>("CloudMultitenantName");
                var mtUser = row.GetAs<string>("CloudMultitenantUser");
                var mtID = row.Get("CloudMultitenantID");

                var sql = string.Empty;

                // sql = $"(SELECT [value], JSON_VALUE([value],'$.TenantId') as [key] FROM OPENJSON ((SELECT {topFilter} " +
                //   $"{mtID} as MultitenantID, * " +                  
                //   "FROM Table WHERE Table.TenantID IN (select TenantID from SQLUser) " +
                //   $"{tenantFilter} FOR JSON PATH, INCLUDE_NULL_VALUES))) TableTmp";

                var rows = spark
                    .Read()
                    .Format("jdbc")
                    .Option("driver", "com.microsoft.sqlserver.jdbc.SQLServerDriver")
                    .Option("dbtable", sql)
                    .Options(
                        new Dictionary<string, string>()
                        {
                                {"url", string.Format(_configuration["ConnectionStrings:ConnectionTenantJob"], connection, mtName)},
                                {"user", mtUser},
                                {"password", mtPwd},
                        })
                    .Load();

                rows
                    .SelectExpr("CAST(key AS STRING)", "CAST(value AS STRING)")
                    .Write()
                    .Format("kafka")
                    .Option("kafka.bootstrap.servers", _configuration["BrokerConnectionUrl"])
                    .Option("topic", _configuration["<%= config.nameCapitalize %>Topic"])
                    .Save();
            });

        spark.Stop();
    }




    /// <summary>
    /// 
    /// </summary>
    /// <param name="sparkSession"></param>
    /// <param name="MTIds"></param>
    /// <param name="ServerPriority"></param>
    /// <returns></returns>
    private DataFrame MultiTenantConnections(SparkSession sparkSession, string MTIds, string ServerPriority)
        => sparkSession
            .Read()
            .Format("jdbc")
            .Option("driver", "com.microsoft.sqlserver.jdbc.SQLServerDriver")
            .Option("url", "jdbc:sqlserver://" + _configuration["ConnectionStrings:SIIGOCloudControlConnection"])
            .Option("dbtable", "cloudmultitenant")
            .Load()
            .Select("CloudMultitenantID", "CloudMultitenantName", "CloudMultitenantUser", "CloudMultitenantPassword")
            .Where($" CloudMultitenantID IN ({MTIds}) AND ServerPriority IN ({ ServerPriority })");

}
}