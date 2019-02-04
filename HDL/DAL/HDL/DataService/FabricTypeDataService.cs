using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DAL.HDL.DataService
{
    public class FabricTypeDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        //DataSet _ds;
        DataTable _dt;
        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();
        public string SaveFabTypeInfo(FabricType fabricType)
        {
            string rv = "";
            try
            {
                Insert_Update_FabricType("sp_insert_FabType", "save_FabType_data", fabricType);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_FabricType(string procedure, string callname, FabricType fabricType)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn) { CommandType = CommandType.StoredProcedure };

            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            _cmd.Parameters.Add(new SqlParameter("@p_FabTypeCode", fabricType.FabTypeCode));
            _cmd.Parameters.Add(new SqlParameter("@p_TypeHead", fabricType.TypeHead));
            _cmd.Parameters.Add(new SqlParameter("@p_Remarks", fabricType.Remarks));

            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }
        public GridEntity<FabricType> GetFabricTypeEntity(GridOptions options)
        {
            var fabricType = KendoGrid<FabricType>.GetGridData_5(options, "sp_select_fabricType_grid", "get_fabricType_summary", "TypeHead");
            return fabricType;
        }

        public List<FabricType> GetAllFabricTypes()
        {
            return _common.Select_Data_List<FabricType>("sp_select_FabType", "get_all_FebType_for_sorting");
        }
    }
}
