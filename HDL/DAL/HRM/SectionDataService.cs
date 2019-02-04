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
    public class SectionDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        readonly string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public string SaveSection(Common_Section objSection)
        {
            string rv = "";
            try
            {
                Insert_Update_Section("sp_Insert_Section", "saveSectioninfo", objSection);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Section(string procedure, string callname, Common_Section objSection)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_SectionId", objSection.SectionID));
            cmd.Parameters.Add(new SqlParameter("@p_SectionName", objSection.SectionName));
            cmd.Parameters.Add(new SqlParameter("@p_SectionNameBan", objSection.SectionNameBan));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objSection.IsActive));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Section> GetSectionSummary(GridOptions options)
        {
            var Section = new GridEntity<Common_Section>();
            Section = KendoGrid<Common_Section>.GetGridData_5(options, "sp_Select_Section_Grid", "get_Section_summary", "SectionName");
            return Section;
        }

        public List<Common_Section> GetSections()
        {
            return _common.Select_Data_List<Common_Section>("sp_Select_Section", "Get_Section_For_Combo");
        }

        public GridEntity<R_UnitDept> GetUnitDepartmentSummary(GridOptions options)
        {
            var Section = new GridEntity<R_UnitDept>();
            Section= KendoGrid<R_UnitDept>.GetGridData_5(options, "sp_Select_Unit_Department_Grid", "get_Unit_Department_Summary", "DepartmentName");
            return Section;
        }

        public GridEntity<R_DeptSection> GetSectionPermissionSummary(GridOptions options, string UDepID)
        {
            return KendoGrid<R_DeptSection>.GetGridData(options, "sp_Select_Unit_Department_Grid", "get_Section_permission", "Sectionname", 0, UDepID);
        }

        public string SaveSectionPermission(DataSet dsSection, DataSet dsRemoveSec)
        {
            string rv = "";
            try
            {
                Insert_Update("SP_Insert_UnitDeptSectionPermission", "Save_Permission", dsSection, dsRemoveSec);

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
