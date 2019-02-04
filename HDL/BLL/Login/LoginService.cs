using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AUtilities;
using DAL.Common;
using DAL.Login;
using Entities.HDL;

namespace BLL.Login
{
    public class LoginService :ILoginRepository
    {
        readonly LoginDataService _loginDataService = new LoginDataService();
     

        public User ValidateUserLogin( string loginId, string password,string terminalId)
        {
            string username = loginId.Trim().ToUpper();
            string userpass = password.Trim();
            string UserPass=EncryptDecryptManager.Encrypt(userpass, true);
            return _loginDataService.GetUserById(username, UserPass, terminalId);
        }
        public static string EncodeMD5(string originalStr)
        {
            Byte[] originalBytes;
            Byte[] encodedBytes;
            MD5 md5 = new MD5CryptoServiceProvider();
            originalBytes = ASCIIEncoding.Default.GetBytes(originalStr);
            encodedBytes = md5.ComputeHash(originalBytes);
            return BitConverter.ToString(encodedBytes);
        }
        public static string StrReverse(string s)
        {
            char[] arr = s.ToCharArray();
            Array.Reverse(arr);
            return new string(arr);
        }
    }
}
