using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HRM;
using System.Data;
using DBManager;
using System.Data.SqlClient;
using DBManager.StoreProcedureHRM;

namespace DAL.HRM
{
    public class DepartmentDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveDepartment(Common_Department objDepartment)
        {
            string rv = "";
            try
            {
                Insert_Update_Department("sp_Insert_Department", "saveDepartmentinfo", objDepartment);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Department(string procedure, string callname, Common_Department objDepartment)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_DepartmentId", objDepartment.DepartmentID));
            cmd.Parameters.Add(new SqlParameter("@p_DepartmentName", objDepartment.DepartmentName));
            cmd.Parameters.Add(new SqlParameter("@p_DepartmentNameBan", objDepartment.DepartmentNameBan));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objDepartment.IsActive));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Department> GetDepartmentSummary(GridOptions options)
        {
            var Department = new GridEntity<Common_Department>();
            Department = KendoGrid<Common_Department>.GetGridData_5(options, "sp_Select_Department_Grid", "get_Department_summary", "DepartmentName");
            return Department;
        }

        public List<Common_Department> GetAllDepartment()
        {
             return _common.Select_Data_List<Common_Department>("sp_Select_Department", "Get_Department_For_Combo");
        }

        public GridEntity<R_UnitDept> GetDepartmentPermissionSummary(GridOptions options, string UnitId)
        {
            return KendoGrid<R_UnitDept>.GetGridData(options, "sp_Select_Unit_Grid", "get_Department_permission", "DepartmentName", 0, UnitId);
        }

        public string SaveUnitDepartmentPermission(DataSet dsMenu, DataSet dsRemoveMenu)
        {
            string rv = "";
            try
            {
                Insert_Update("SP_Insert_UnitDeptPermission", "Save_Permission", dsMenu, dsRemoveMenu);

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
