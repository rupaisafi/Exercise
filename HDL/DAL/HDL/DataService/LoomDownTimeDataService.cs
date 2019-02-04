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
    public class LoomDownTimeDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<LoomDownTimeDetail> GetDetail(string masterID)
        {
            return _service.Select_Data_List<LoomDownTimeDetail>("SP_SELECT_LOOM_DOWN_TIME_INFO", "GET_DETAIL_BY_MASTER_ID", masterID);
        }
        public GridEntity<LoomDownTimeMaster> GetSummaryData(GridOptions options, string from, string to)
        {
            return KendoGrid<LoomDownTimeMaster>.GetGridData_5(options, "SP_SELECT_LOOM_DOWN_TIME_GRID", "GET_SUMMARY_DATA", "LoomDate", from, to);
        }

        public LoomDownTimeMaster SaveLoomDownTimeMaster(LoomDownTimeMaster master)
        {
            var res = new LoomDownTimeMaster();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateLoomDownTimeMaster("SP_INSERT_LOOM_DOWN_TIME_MASTER_INFO", "SAVE_LOOM_DOWN_TIME_MASTER", master);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateLoomDownTimeMaster(string procedure, string callname, LoomDownTimeMaster master)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", master.ID));
            cmd.Parameters.Add(new SqlParameter("@LoomDate", master.LoomDate.ToString("dd/MM/yyyy")));
            cmd.Parameters.Add(new SqlParameter("@Remark", master.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", master.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", master.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@IsDeleted", master.IsDeleted));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public LoomDownTimeDetail SaveLoomDownTimeDetail(LoomDownTimeDetail detail)
        {
            var res = new LoomDownTimeDetail();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateLoomDownTimeMaster("SP_INSERT_LOOM_DOWN_TIME_DETAIL_INFO", "SAVE_LOOM_DOWN_TIME_DETAIL", detail);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateLoomDownTimeMaster(string procedure, string callname, LoomDownTimeDetail detail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", detail.ID));
            cmd.Parameters.Add(new SqlParameter("@MasterID", detail.MasterID));
            cmd.Parameters.Add(new SqlParameter("@LoomID", detail.LoomID));
            cmd.Parameters.Add(new SqlParameter("@ReasonID", detail.ReasonID));
            cmd.Parameters.Add(new SqlParameter("@StopTime", detail.StopTime));
            cmd.Parameters.Add(new SqlParameter("@RunTime", detail.RunTime));
            cmd.Parameters.Add(new SqlParameter("@TotalTime", detail.TotalTime));
            cmd.Parameters.Add(new SqlParameter("@Remark", detail.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", detail.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", detail.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@IsDeleted", detail.IsDeleted));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

    }
}