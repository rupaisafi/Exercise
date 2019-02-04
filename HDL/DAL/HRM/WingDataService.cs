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
    public class WingDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveWing(Common_Wing objWing)
        {
            string rv = "";
            try
            {
                Insert_Update_Wing("sp_Insert_Wing", "saveWinginfo", objWing);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Wing(string procedure, string callname, Common_Wing objWing)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_WingId", objWing.WingID));
            cmd.Parameters.Add(new SqlParameter("@p_WingName", objWing.WingName));
            cmd.Parameters.Add(new SqlParameter("@p_WingNameBan", objWing.WingNameBan));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objWing.IsActive));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Wing> GetWingSummary(GridOptions options)
        {
            var Wing = new GridEntity<Common_Wing>();
            Wing = KendoGrid<Common_Wing>.GetGridData_5(options, "sp_Select_Wing_Grid", "get_Wing_summary", "WingName");
            return Wing;
        }

        public List<Common_Wing> GetWings()
        {
            return _common.Select_Data_List<Common_Wing>("sp_Select_Wing", "Get_Wing_For_Combo");
        }

        public GridEntity<R_DeptSection> GetDeptSectionSummary(GridOptions options)
        {
            var Wing = new GridEntity<R_DeptSection>();
            Wing = KendoGrid<R_DeptSection>.GetGridData_5(options, "sp_Select_Unit_Department_Section_Grid", "get_Unit_Department_Section_Summary", "SectionName");
            return Wing;
        }

        public GridEntity<R_SecWing> GetWingPermissionSummary(GridOptions options, string DSecID)
        {
            return KendoGrid<R_SecWing>.GetGridData(options, "sp_Select_Unit_Department_Section_Grid", "get_Wing_permission", "Wingname", 0, DSecID);
        }

        public string SaveWingPermission(DataSet dsWing, DataSet dsRemoveSec)
        {
            string rv = "";
            try
            {
                Insert_Update("SP_Insert_UnitDeptSectionWingPermission", "Save_Permission", dsWing, dsRemoveSec);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update(string procedure, string callname, DataSet rqdXmlv1 = null, DataSet rqdXmlv2 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();

            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add("@dsxmlu2", SqlDbType.Xml).Value = (rqdXmlv2 == null ? null : rqdXmlv2.GetXml());
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));

            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);

            dbConn.Close();
            return dt;
        }
    }
}
