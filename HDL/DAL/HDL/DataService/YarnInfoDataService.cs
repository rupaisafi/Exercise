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
using Entities.HDL;

namespace DAL.HDL.DataService
{
    public class YarnInfoDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public string SaveYarnInfo(Yarn objYarn)
        {
            string rv = "";
            try
            {
                Insert_Update_SupplierInfo("sp_insert_yarn_info", "saveyarninfo", objYarn);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_SupplierInfo(string procedure, string callname, Yarn objYarn)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_YarnId", objYarn.YarnId));
            cmd.Parameters.Add(new SqlParameter("@p_YarnName", objYarn.YarnName));
            cmd.Parameters.Add(new SqlParameter("@p_YarnCode", objYarn.YarnCode));
            cmd.Parameters.Add(new SqlParameter("@p_SupplierId", objYarn.SupplierId));
            cmd.Parameters.Add(new SqlParameter("@p_ICode", objYarn.ICode));
            cmd.Parameters.Add(new SqlParameter("@p_YarnSpec", objYarn.YarnSpecification));
            cmd.Parameters.Add(new SqlParameter("@p_SlubLengthCM", objYarn.SlubLengthCM));
            cmd.Parameters.Add(new SqlParameter("@p_PauseCM", objYarn.PauseCM));
            cmd.Parameters.Add(new SqlParameter("@p_ThiknessTime", objYarn.ThiknessTime));
            cmd.Parameters.Add(new SqlParameter("@p_SlubPerMtr", objYarn.SlubPerMtr));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objYarn.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objYarn.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public GridEntity<Yarn> GetYarnInfoSummary(GridOptions options)
        {
            var yarn = new GridEntity<Yarn>();
            yarn = KendoGrid<Yarn>.GetGridData_5(options, "sp_select_yarn_grid", "get_yarn_summary", "YarnName");
            return yarn;
        }

        public List<Yarn> GetAllYarn()
        {
            return _common.Select_Data_List<Yarn>("sp_select_yarn_info", "get_all_yarn_info");
        }
    }
}
