using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.Core.Menu;
using Entities.HDL;

namespace DAL.Core
{
    public class UserDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();
        public List<User> GetUserList()
        {
            return _common.Select_Data_List<User>("SP_LOGIN_USER", "GET_USER_LIST");
        }

        public GridEntity<User> GetUserSummary(GridOptions options, string usrId)
        {
            return KendoGrid<User>.GetGridData(options, "SP_SELECT_USER_GRID", "GET_USER_DATA", "USERNAME", 0, usrId);
        }

        public string SaveUserPermission(MenuPermission usrObj, DataSet dsMenu, DataSet dsRemoveMenu)
        {
            string rv = "";
            try
            {
                Insert_Update("SP_INSERT_USER", "SAVE_USER_MENU_PERMISSION_DATA", usrObj,dsMenu,dsRemoveMenu);

                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update(string procedure, string callname, MenuPermission menu, DataSet rqdXmlv1 = null, DataSet rqdXmlv2 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();

            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add("@dsxmlu2", SqlDbType.Xml).Value = (rqdXmlv2 == null ? null : rqdXmlv2.GetXml());
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_USERID", menu.EmpId));
            cmd.Parameters.Add(new SqlParameter("@p_USERNAME", menu.UserName));
            cmd.Parameters.Add(new SqlParameter("@p_USERDESIG", menu.UsrDesig));
            cmd.Parameters.Add(new SqlParameter("@p_USERPASS", menu.UsrPass));
            cmd.Parameters.Add(new SqlParameter("@p_USERRIGHT", menu.UsrRight));
            cmd.Parameters.Add(new SqlParameter("@p_USERTYPE", menu.UserType));

            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);

            dbConn.Close();
            return dt;
        }

        public string ChangePassword(string username, string currUserpass, string newUserPass)
        {
            string rv = "";
           
            try
            {
                CommonConnection con = new CommonConnection();
                string sql = String.Format(@"UPDATE UserInfo SET USRPASS='{0}'  WHERE EMPID = '{1}' AND USRPASS='{2}'", newUserPass, username, currUserpass);
                con.ExecuteNonQuery(sql);
                rv = Operation.Success.ToString();
                return rv;
            }
            catch (Exception)
            {
                rv = Operation.Failed.ToString();
            }

            return rv;
        }

        public User GetUserInfoById(string usrid)
        {
            CommonDataService common = new CommonDataService();
            var usrList= common.Select_Data_List<User>("SP_LOGIN_USER", "GET_USER_BY_ID", usrid);
            return usrList.SingleOrDefault();
        }
    }
}
