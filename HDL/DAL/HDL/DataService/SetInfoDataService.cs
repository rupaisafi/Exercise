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
    public class SetInfoDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        //DataSet _ds;
        DataTable _dt;
        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public string SaveSetInfo(SetInfoEntity objSet)
        {
            string rv = "";
            try
            {
                Insert_Update_SetInfo("sp_insert_setInfo", "save_SetInfo_data", objSet);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_SetInfo(string procedure, string callname, SetInfoEntity objSet)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn);
            _cmd.CommandType = CommandType.StoredProcedure;
            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));

            _cmd.Parameters.Add(new SqlParameter("@p_SetID", objSet.SetId));
            _cmd.Parameters.Add(new SqlParameter("@p_WarpDate", objSet.WarpDate));
            _cmd.Parameters.Add(new SqlParameter("@p_SetNo", objSet.SetNo));
            _cmd.Parameters.Add(new SqlParameter("@p_Length", objSet.Length));
            _cmd.Parameters.Add(new SqlParameter("@p_EndsPerBeam", objSet.EndsPerBeam));
            _cmd.Parameters.Add(new SqlParameter("@p_TotalBeam", objSet.TotalBeam));
            _cmd.Parameters.Add(new SqlParameter("@p_TotalEnds", objSet.TotalEnds));
            _cmd.Parameters.Add(new SqlParameter("@p_DrumPreasure", objSet.DrumPreasure));
            _cmd.Parameters.Add(new SqlParameter("@p_YarnTension", objSet.YarnTension));
            _cmd.Parameters.Add(new SqlParameter("@p_BeamCreel", objSet.BeamCreel));
            _cmd.Parameters.Add(new SqlParameter("@p_MachineNo", objSet.MachineNo));
            _cmd.Parameters.Add(new SqlParameter("@p_ProductionTypeCode", objSet.ProductionTypeCode));
            _cmd.Parameters.Add(new SqlParameter("@p_SetStatusCode", objSet.SetStatusCode));
            _cmd.Parameters.Add(new SqlParameter("@p_Remarks", objSet.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_UserName", objSet.UserName));
            _cmd.Parameters.Add(new SqlParameter("@p_EditDate", objSet.EditDate));

            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }

        public GridEntity<SetInfoEntity> GetSetInfoSummary(GridOptions options)
        {
            return KendoGrid<SetInfoEntity>.GetGridData_5(options, "sp_select_setInfo_grid", "get_setinfo_summary", "SetNo");
        }

        public List<SetInfoEntity> GetAllSetInfo()
        {
            return _common.Select_Data_List<SetInfoEntity>("sp_select_setinfo", "get_all_set");
        }
        public List<SetProductionType> GetAllSetProdType()
        {
            return _common.Select_Data_List<SetProductionType>("sp_select_setinfo", "get_all_setProdType");
        }
        public List<SetStatus> GetAllSetStatus()
        {
            return _common.Select_Data_List<SetStatus>("sp_select_setinfo", "get_all_setStatus");
        }

    }
}
