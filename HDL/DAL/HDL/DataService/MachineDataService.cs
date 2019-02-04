using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DAL.HDL.DataService
{
    public class MachineDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        //DataSet _ds;
        DataTable _dt;
        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public string SaveMachine(MachineEntity machineEntity)
        {
            string rv = "";
            try
            {
                Insert_Update_Machine("sp_insert_machine", "save_machine_data", machineEntity);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_Machine(string procedure, string callname, MachineEntity machineEntity)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn) { CommandType = CommandType.StoredProcedure };

            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            _cmd.Parameters.Add(new SqlParameter("@p_MID", machineEntity.MID));
            _cmd.Parameters.Add(new SqlParameter("@p_UnitCode", machineEntity.UnitCode));
            _cmd.Parameters.Add(new SqlParameter("@p_MNo", machineEntity.MNo));
            _cmd.Parameters.Add(new SqlParameter("@p_MName", machineEntity.MName));
            _cmd.Parameters.Add(new SqlParameter("@p_MachineName", machineEntity.MachineName));
            _cmd.Parameters.Add(new SqlParameter("@p_GCode", machineEntity.GCode));
            _cmd.Parameters.Add(new SqlParameter("@p_UCode", machineEntity.UCode));
            _cmd.Parameters.Add(new SqlParameter("@p_TCode", machineEntity.TCode));
            _cmd.Parameters.Add(new SqlParameter("@p_NoOfMC", machineEntity.NoOfMC));
            _cmd.Parameters.Add(new SqlParameter("@p_TotalMC", machineEntity.TotalMC));
            _cmd.Parameters.Add(new SqlParameter("@p_ProdCapacity", machineEntity.ProdCapacity));
            _cmd.Parameters.Add(new SqlParameter("@p_Unit", machineEntity.Unit));
            _cmd.Parameters.Add(new SqlParameter("@p_CapacityRPM", machineEntity.CapacityRPM));
            _cmd.Parameters.Add(new SqlParameter("@p_CountryOfOrgin", machineEntity.CountryOfOrgin));
            _cmd.Parameters.Add(new SqlParameter("@p_Prod", machineEntity.Prod));
            _cmd.Parameters.Add(new SqlParameter("@p_Remarks", machineEntity.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_UserName", machineEntity.UserName));
            _cmd.Parameters.Add(new SqlParameter("@p_EDate", machineEntity.EDate));
            _cmd.Parameters.Add(new SqlParameter("@p_PickPday", machineEntity.PickPday));

            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }
        public GridEntity<MachineEntity> GetMachineEntity(GridOptions options)
        {
            var shift = KendoGrid<MachineEntity>.GetGridData_5(options, "sp_select_machine_grid", "get_machine_summary", "MNo");
            return shift;
        }
    }
}
