using DAL.Common;
using DBManager;
using DBManager.StoreProcedureHRM;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HRM
{
    public class DesignationGroupDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveDesignationGroup(Common_DesignationGroup objDesignationGroup)
        {
            string rv = "";
            try
            {
                Insert_Update_DesignationGroup("sp_Insert_DesignationGroup", "saveDesignationGroupinfo", objDesignationGroup);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_DesignationGroup(string procedure, string callname, Common_DesignationGroup objDesignationGroup)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_DesGroupID", objDesignationGroup.DesGroupID));
            cmd.Parameters.Add(new SqlParameter("@p_DesGroupName", objDesignationGroup.DesGroupName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_DesignationGroup> GetDesignationGroupSummary(GridOptions options)
        {
            var DesignationGroup = new GridEntity<Common_DesignationGroup>();
            DesignationGroup = KendoGrid<Common_DesignationGroup>.GetGridData_5(options, "sp_Select_DesignationGroup_Grid", "get_DesignationGroup_summary", "DesGroupName");
            return DesignationGroup;
        }

        public List<Common_DesignationGroup> GetAllDesignationGroup()
        {
            return _common.Select_Data_List<Common_DesignationGroup>("sp_Select_DesignationGroup_Info", "get_All_DesignationGroup");
        }
    }
}
