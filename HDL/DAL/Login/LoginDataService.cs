using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AUtilities;
using DAL.Common;
using Entities.HDL;

namespace DAL.Login
{
    public class LoginDataService
    {
        CommonDataService _common = new CommonDataService();
        public User GetUserById( string username, string userPass,string terminalId)
        {
            var ds = new DataSet();
            var dt = new DataTable();
            ds = _common.select_data_10("", "SP_LOGIN_USER", "LOGON_USER", username, userPass, terminalId);

            dt = ds.Tables[0];
         
            var dataList = (List<User>)ListConversion.ConvertTo<User>(dt);
            return dataList.SingleOrDefault();
        }
    }
}
