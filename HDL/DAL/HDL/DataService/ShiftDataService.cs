using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DAL.HDL.DataService
{
    public class ShiftDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        //DataSet _ds;
        DataTable _dt;
        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();
        public string SaveShift(ShiftEntity shift)
        {
            string rv = "";
            try
            {
                Insert_Update_Shift("sp_insert_shift", "save_shift_data", shift);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_Shift(string procedure, string callname, ShiftEntity shift)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn) { CommandType = CommandType.StoredProcedure };

            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            _cmd.Parameters.Add(new SqlParameter("@p_SID", shift.ShiftId));
            _cmd.Parameters.Add(new SqlParameter("@p_ShiftNo", shift.ShiftNo));
            _cmd.Parameters.Add(new SqlParameter("@p_Shift", shift.ShiftHead));
            _cmd.Parameters.Add(new SqlParameter("@p_ShiftTime", shift.ShiftDuration));


            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }
        public GridEntity<ShiftEntity> GetShiftEntity(GridOptions options)
        {
            var shift = KendoGrid<ShiftEntity>.GetGridData_5(options, "sp_select_shift_grid", "get_shift_summary", "ShiftNo");
            return shift;
        }

    }
}
