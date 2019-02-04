using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DAL.HDL.DataService
{
    public class ProdQualityDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        //DataSet _ds;
        DataTable _dt;
        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();
        public string SaveProdQuality(ProdQualityEntity prodQuality)
        {
            string rv = "";
            try
            {
                Insert_Update_ProdQuality("sp_insert_ProdQuality", "save_ProdQuality_data", prodQuality);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_ProdQuality(string procedure, string callname, ProdQualityEntity prodQuality)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn) { CommandType = CommandType.StoredProcedure };

            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));

            _cmd.Parameters.Add(new SqlParameter("@p_QID", prodQuality.QID));
            _cmd.Parameters.Add(new SqlParameter("@p_QCode", prodQuality.QCode));
            _cmd.Parameters.Add(new SqlParameter("@p_QName", prodQuality.QName));
            _cmd.Parameters.Add(new SqlParameter("@p_UserName", prodQuality.UserName));
            _cmd.Parameters.Add(new SqlParameter("@p_EDate", prodQuality.EDate));
            _cmd.Parameters.Add(new SqlParameter("@p_Remarks", prodQuality.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_Rate", prodQuality.Rate));

            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }
        public GridEntity<ProdQualityEntity> GetProdQualityEntity(GridOptions options)
        {
            var prodQuality = KendoGrid<ProdQualityEntity>.GetGridData_5(options, "sp_select_ProdQuality_grid", "get_ProdQuality_summary", "QCode");
            return prodQuality;
        }

    }
}
