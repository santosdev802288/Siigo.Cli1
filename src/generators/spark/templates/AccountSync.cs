using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using Apache.Arrow;
using Microsoft.Extensions.Configuration;
using Microsoft.Spark.Sql;
using System.Security.Cryptography;
using Array = System.Array;

namespace Siigo.Ms<%= config.nameUpper %>.Sync
{
    public class AccountSync
    {
        private readonly IConfiguration _configuration;
        private readonly string _cryptoGraphyPass = "SolsoftPassPhrase";

        public AccountSync(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        public void Sync(ProgramOptions options)
        {
            var tenantFilter = String.Empty;
            var topFilter = string.Empty;

            if (options.Top > 0)
            {
                topFilter = $" TOP {options.Top} ";
            }

            if (options.TenantID.Trim() != "")
            {
                tenantFilter = $" AND TenantID = {options.TenantID}";
            }

            var sql = $"(SELECT [value], JSON_VALUE([value],'$.TenantId') as [key] FROM OPENJSON ((SELECT {topFilter} " + "AccountID," +
                      "CAST(ISNULL(IsCustomer,0) AS BIT) IsCustomer," +
                      "CAST(ISNULL(IsSupplier,0) AS BIT) IsSupplier," +
                      "CAST(ISNULL(IsOther,0) AS BIT) IsOther," +
                      "CAST(ISNULL(IsSocialReason,0) AS BIT) IsSocialReason," +
                      "FirstName," + "LastName," + "FullName," + "IdTypeCode," + "Identification," + "CAST(NULLIF(CheckDigit,'') AS nvarchar(10)) CheckDigit," +
                      "BranchOffice," + "VATCompanyType," + "CompanyName," + "[Address]," + "CityCode," +
                      "Phone," + "CAST(ISNULL(IsActive,0) AS BIT) IsActive," +
                      "SalesmanCode," + "CreatedByDate," + "CreatedByUser," + "UpdatedByDate," + "UpdatedByUser, " +
                      "Comments," + "FiscalResponsibilityCode," + "CollectorCode," +
                      "PostalCode," + "Ms<%= config.nameUpper %>ID Id," + "CONVERT(VARCHAR(max),TenantId,1) TenantId, " +
                      "(SELECT FirstName, LastName, Email, CAST(ISNULL(IsPrincipal, 0) AS BIT) IsPrincipal, ContactID ContactId, " +
                      "AccountCode, NULLIF(Mobile,'') CellPhone, ISNULL(Charge,'') Charge, ISNULL(FullName,'') FullName FROM Contact WHERE AccountCode = AccountID FOR JSON PATH, INCLUDE_NULL_VALUES) Contacts " +
                      "FROM Account WHERE Sync = 0 " +
                      $"{tenantFilter} FOR JSON PATH, INCLUDE_NULL_VALUES))) AccountTmp";
            
            var spark = SparkSession
                .Builder()
                .AppName("AccountMigration")
                .GetOrCreate();

            var connections = MultiTenantConnections(spark);

            connections
                .Collect()
                .ToList()
                .ForEach(row =>
                {
                    byte[] bytDecrypt = Convert.FromBase64String(
                        row.GetAs<string>("CloudMultitenantPassword") ?? throw new Exception("mt pwd not found"));
                    var bytPk = new PasswordDeriveBytes(_cryptoGraphyPass, null).GetBytes(32);

                    var mtPwd = Decrypt(bytDecrypt, bytPk);
                    var mtName = row.GetAs<string>("CloudMultitenantName");
                    var mtUser = row.GetAs<string>("CloudMultitenantUser");

                    var rows = spark
                        .Read()
                        .Format("jdbc")
                        .Option("driver", "com.microsoft.sqlserver.jdbc.SQLServerDriver")
                        .Option("dbtable", sql)
                        .Options(
                            new Dictionary<string, string>()
                            {
                                {"url", string.Format(_configuration["ConnectionStrings:ConnectionTenantJob"], mtName)},
                                {"user", mtUser},
                                {"password", mtPwd},
                            })
                        .Load();

                    rows
                        .SelectExpr("CAST(key AS STRING)", "CAST(value AS STRING)")
                        .Write()
                        .Format("kafka")
                        .Option("kafka.bootstrap.servers", _configuration["BrokerConnectionUrl"])
                        .Option("topic", _configuration["Spark<%= config.nameUpper %>Migration"])
                        .Save();
                });

            spark.Stop();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="sparkSession"></param>
        /// <returns></returns>
        private DataFrame MultiTenantConnections(SparkSession sparkSession)
            => sparkSession
                .Read()
                .Format("jdbc")
                .Option("driver", "com.microsoft.sqlserver.jdbc.SQLServerDriver")
                .Option("url", "jdbc:sqlserver://" + _configuration["ConnectionStrings:SIIGOCloudControlConnection"])
                .Option("dbtable", "cloudmultitenant")
                .Load()
                .Select("CloudMultitenantName", "CloudMultitenantUser", "CloudMultitenantPassword")
                .Where($" CloudServerCode=1 AND CloudMultitenantID=84 AND  ServerPriority IN ({ int.Parse(_configuration["ServerPriority"]) })");

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bytDecrypt"></param>
        /// <param name="bytPk"></param>
        /// <returns></returns>
        private string Decrypt(byte[] bytDecrypt, byte[] bytPk)
        {
            var miRijndael = Rijndael.Create();
            var tempArray = new byte[miRijndael.IV.Length];
            var encrypted = new byte[bytDecrypt.Length - miRijndael.IV.Length];
            var returnValue = string.Empty;

            try
            {
                miRijndael.Key = bytPk;

                Array.Copy(bytDecrypt, tempArray, tempArray.Length);
                Array.Copy(bytDecrypt, tempArray.Length, encrypted, 0, encrypted.Length);
                miRijndael.IV = tempArray;

                returnValue =
                    System.Text.Encoding.UTF8.GetString(
                        (miRijndael.CreateDecryptor()).TransformFinalBlock(encrypted, 0, encrypted.Length));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error Decrypt pwd {0}", e.Message);
            }
            finally
            {
                miRijndael.Clear();
            }

            return returnValue;
        }
    }
}