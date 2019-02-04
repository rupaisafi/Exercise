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
    public class AllowanceByDesGroupDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveAllowanceByDesGroup(Payroll_AllowanceByDesGroup objAllowanceByDesGroup)
        {
            string rv = "";
            try
            {
                Insert_Update_AllowanceByDesGroup("sp_Insert_AllowanceByDesGroup", "saveAllowanceByDesGroupinfo", objAllowanceByDesGroup);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_AllowanceByDesGroup(string procedure, string callname, Payroll_AllowanceByDesGroup objAllowanceByDesGroup)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_AllowanceByDesGroupID", objAllowanceByDesGroup.AllowanceByDesGroupID));
            cmd.Parameters.Add(new SqlParameter("@p_DesGroupID", objAllowanceByDesGroup.DesGroupID));
            cmd.Parameters.Add(new SqlParameter("@p_LunchPayRate", objAllowanceByDesGroup.LunchPayRate));
            cmd.Parameters.Add(new SqlParameter("@p_TiffinPayRate", objAllowanceByDesGroup.TiffinPayRate));
            cmd.Parameters.Add(new SqlParameter("@p_IftarPayRate", objAllowanceByDesGroup.IftarPayRate));
            cmd.Parameters.Add(new SqlParameter("@p_NightPayRate", objAllowanceByDesGroup.NightPayRate));
            cmd.Parameters.Add(new SqlParameter("@p_HolidayPayRate", objAllowanceByDesGroup.HolidayPayRate));
            cmd.Parameters.Add(new SqlParameter("@p_EffectDate", objAllowanceByDesGroup.EffectDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Payroll_AllowanceByDesGroup> GetAllowanceByDesGroupSummary(GridOptions options)
        {
            var AllowanceByDesGroup = new GridEntity<Payroll_AllowanceByDesGroup>();
            AllowanceByDesGroup = KendoGrid<Payroll_AllowanceByDesGroup>.GetGridData_5(options, "sp_Select_AllowanceByDesGroup_Grid", "get_AllowanceByDesGroup_summary", "DesGroupName");
            return AllowanceByDesGroup;
        }

        public List<Payroll_AllowanceByDesGroup> GetAllAllowanceByDesGroup()
        {
            return _common.Select_Data_List<Payroll_AllowanceByDesGroup>("sp_Select_AllowanceByDesGroup_Info", "get_All_AllowanceByDesGroup");
        }
    }
}
