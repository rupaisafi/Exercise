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
    public class CompanyDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveCompany(Common_Company objCompany)
        {
            string rv = "";
            try
            {
                Insert_Update_Company("sp_Insert_Company", "savecompanyinfo", objCompany);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Company(string procedure, string callname, Common_Company objCompany)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_CompnayId", objCompany.CompanyId));
            cmd.Parameters.Add(new SqlParameter("@p_CompnayName", objCompany.CompanyName));
            cmd.Parameters.Add(new SqlParameter("@p_CompanyNameBan", objCompany.CompanyNameBan));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objCompany.IsActive));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Company> GetCompanySummary(GridOptions options)
        {
            var Company = new GridEntity<Common_Company>();
            Company = KendoGrid<Common_Company>.GetGridData_5(options, "sp_Select_Company_Grid", "get_Company_summary", "CompanyName");
            return Company;
        }

        public List<Common_Company> GetAllCompany()
        {
            return _common.Select_Data_List<Common_Company>("sp_Select_Company_Info", "get_All_Company");
        }
    }
}
