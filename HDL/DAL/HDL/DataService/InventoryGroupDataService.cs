using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DAL.HDL.DataService
{
    public class InventoryGroupDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        //DataSet _ds;
        DataTable _dt;
        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public string SaveGroup(InventoryGroupEntity groupEntity)
        {
            string rv = "";
            try
            {
                Insert_Update_Group("sp_insert_AGroup", "save_group_data", groupEntity);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Group(string procedure, string callname, InventoryGroupEntity groupEntity)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn) { CommandType = CommandType.StoredProcedure };

            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            _cmd.Parameters.Add(new SqlParameter("@p_AGIG", groupEntity.AGIG));
            _cmd.Parameters.Add(new SqlParameter("@p_IGCode", groupEntity.IGCode));
            _cmd.Parameters.Add(new SqlParameter("@p_IGName", groupEntity.IGName));
            _cmd.Parameters.Add(new SqlParameter("@p_UserName", groupEntity.UserName));
            _cmd.Parameters.Add(new SqlParameter("@p_EDate", groupEntity.EDate));

            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }

        public GridEntity<InventoryGroupEntity> GetGroupEntity(GridOptions options)
        {
            var g = KendoGrid<InventoryGroupEntity>.GetGridData_5(options, "sp_select_InvGroup_grid", "get_group_summary", "IGCode");
            return g;
        }
    }
}
