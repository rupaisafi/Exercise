using DAL.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;
using DBManager;
using System.Data;
using System.Data.SqlClient;
using DBManager.StoreProcedureHRM;

namespace DAL.HRM
{
    public class DesignationDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        readonly string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveDesignation(Common_Designation objDesignation)
        {
            string rv = "";
            try
            {
                Insert_Update_Designation("sp_Insert_Designation", "saveDesignationinfo", objDesignation);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Designation(string procedure, string callname, Common_Designation objDesignation)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_DesignationId", objDesignation.DesignationID));
            cmd.Parameters.Add(new SqlParameter("@p_DesignationName", objDesignation.DesignationName));
            cmd.Parameters.Add(new SqlParameter("@p_DesignationNameBan", objDesignation.DesignationNameBan));
            cmd.Parameters.Add(new SqlParameter("@p_DesGroupID", objDesignation.DesGroupID));
            cmd.Parameters.Add(new SqlParameter("@p_Grade", objDesignation.Grade));
            cmd.Parameters.Add(new SqlParameter("@p_OrderBy", objDesignation.OrderBy));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objDesignation.IsActive));
            cmd.Parameters.Add(new SqlParameter("@p_IsDelete", objDesignation.IsDelete));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Designation> GetDesignationSummary(GridOptions options)
        {
            var Designation = new GridEntity<Common_Designation>();
            Designation = KendoGrid<Common_Designation>.GetGridData_5(options, "sp_Select_Designation_Grid", "get_Designation_summary", "DesignationName");
            return Designation;
        }

        public List<Common_Designation> GetDesignations()
        {
            return _common.Select_Data_List<Common_Designation>("sp_Select_Designation", "Get_Designation_For_Combo");
        }

        public List<Common_DesignationGroup> GetAllDesignationGroup()
        {
            return _common.Select_Data_List<Common_DesignationGroup>("sp_Select_DesignationGroup", "Get_DesignationGroup_For_Combo");
        }

        public GridEntity<R_DeptDesignation> GetDesignationPermissionSummary(GridOptions options, string UDepID)
        {
            return KendoGrid<R_DeptDesignation>.GetGridData(options, "sp_Select_Designation_Permission_Grid", "get_Designation_permission", "DesignationName", 0, UDepID);
        }

        public string SaveDesignationPermission(DataSet dsDesignation, DataSet dsRemoveDesignation)
        {
            string rv = "";
            try
            {
                Insert_Update("SP_Insert_DeptDesignationPermission", "Save_Permission", dsDesignation, dsRemoveDesignation);

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
