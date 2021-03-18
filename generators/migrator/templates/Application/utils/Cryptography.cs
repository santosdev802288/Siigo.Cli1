using System;
using System.Security.Cryptography;

namespace Siigo.<%= config.nameCapitalize %>.Sync.Application.utils
{
    public class Cryptography
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="bytDecrypt"></param>
    /// <param name="bytPk"></param>
    /// <returns></returns>
    public string Decrypt(byte[] bytDecrypt, byte[] bytPk)
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