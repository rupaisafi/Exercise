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
   public class MenuDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
       readonly CommonDataService _common = new CommonDataService();
       public string SaveMenu(Menu menu)
       {
           string rv = "";
           try
           {
               Insert_Update("SP_INSERT_MENU", "SAVE_MENU_DATA", menu);

               rv = Operation.Success.ToString();
           }
           catch (Exception ex)
           {
               rv = ex.Message;
           }
           return rv;
       }


       public DataTable Insert_Update(string procedure, string callname, Menu menu)
       {
           dbConn = new SqlConnection(ConnectionString);
           dbConn.Open();

           cmd = new SqlCommand(procedure, dbConn);
           cmd.CommandType = CommandType.StoredProcedure;

           cmd.Parameters.Add(new SqlParameter("@call_name", callname));
           cmd.Parameters.Add(new SqlParameter("@p_MENUID", menu.MenuId));
           cmd.Parameters.Add(new SqlParameter("@p_MODULEID", menu.ModuleId));
           cmd.Parameters.Add(new SqlParameter("@p_MENUNAME", menu.MenuName));
           cmd.Parameters.Add(new SqlParameter("@p_MENUPATH", menu.MenuPath));
           cmd.Parameters.Add(new SqlParameter("@p_PARENTMENU", menu.ParentMenu));
           cmd.Parameters.Add(new SqlParameter("@p_TODO", menu.ToDo));

           //cmd.Parameters.Add(new SqlParameter("@p_USERID", menu.UserId));
           //cmd.Parameters.Add(new SqlParameter("@p_ISACTV", menu.IsActive));
           //cmd.Parameters.Add(new SqlParameter("@p_TERMID", menu.TermId));
           da = new SqlDataAdapter(cmd);
           dt = new DataTable();
           da.Fill(dt);

           dbConn.Close();
           return dt;
       }

       public GridEntity<Menu> GetMenuSummary(GridOptions options)
       {
           return KendoGrid<Menu>.GetGridData(options, "SP_SELECT_MENU_GRID", "GET_MENU_INFO", "MENUNAME");
       }

       public List<Menu> SelectAllMenuByModuleId(int moduleId)
       {
           return _common.Select_Data_List<Menu>("SP_SELECT_MENU", "GET_MENU_BY_MODULEID",moduleId.ToString());
       }

       public List<Menu> SelectAllMenu()
       {
           return _common.Select_Data_List<Menu>("SP_SELECT_MENU", "GET_ALL_MENU_FOR_SORTING");
       }

       public string UpdateMenuSorting(List<Menu> menuList, User user)
       {
            string res = "";
           CommonConnection con = new CommonConnection();
           try
           {
               var quary = "";
               foreach (var menu in menuList)
               {
                   quary += string.Format(" Update Menu Set SorOrder = {0} where MenuId = {1};", menu.SortOrder, menu.MenuId);
               }
               if (quary != "")
               {
                   con.ExecuteNonQuery(quary); 
               }
               res = Operation.Success.ToString();
           }
           catch (Exception ex)
           {
               res = Operation.Failed.ToString();
           }
           return res;
       }

       public List<Menu> SelectMenuByUserPermission(string userId)
       {
           return _common.Select_Data_List<Menu>("SP_SELECT_MENU", "GET_MENU_BY_USER", userId);
       }

       public GridEntity<MenuPermission> GetMenuPermissionSummary(GridOptions options, string usrid)
       {
           return KendoGrid<MenuPermission>.GetGridData(options, "SP_SELECT_MENU_GRID", "GET_MENU_PERMISSION", "MENUNAME", 0, usrid);
       }
    }
}
