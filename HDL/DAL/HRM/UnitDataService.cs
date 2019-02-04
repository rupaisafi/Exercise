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
    public class UnitDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveUnit(Common_Unit objUnit)
        {
            string rv = "";
            try
            {
                Insert_Update_Unit("sp_Insert_Unit", "saveUnitinfo", objUnit);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Unit(string procedure, string callname, Common_Unit objUnit)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_CompanyId", objUnit.CompanyId));
            cmd.Parameters.Add(new SqlParameter("@p_UnitId", objUnit.UnitId));
            cmd.Parameters.Add(new SqlParameter("@p_UnitName", objUnit.UnitName));
            cmd.Parameters.Add(new SqlParameter("@p_UnitNameBan", objUnit.UnitNameBan));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objUnit.IsActive));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Unit> GetUnitSummary(GridOptions options)
        {
            var Unit = new GridEntity<Common_Unit>();
            Unit = KendoGrid<Common_Unit>.GetGridData_5(options, "sp_Select_Unit_Grid", "get_Unit_summary", "UnitName");
            return Unit;
        }

        public List<Common_Unit> GetAllUnit()
        {
            return _common.Select_Data_List<Common_Unit>("sp_Select_Unit", "get_all_Unit");
        }
    }
}
