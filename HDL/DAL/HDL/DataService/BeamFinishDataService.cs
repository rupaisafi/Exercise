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
    public class BeamFinishDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<TblBeamFinishDetails> GetDetails(string masterID)
        {
            return _service.Select_Data_List<TblBeamFinishDetails>("SP_SELECT_BEAM_FINISH_DETAILS", "GET_DETAILS", masterID);
        }
        public GridEntity<TblBeamFinish> GetSummary(GridOptions options, string from, string to)
        {
            return KendoGrid<TblBeamFinish>.GetGridData_5(options, "SP_SELECT_BEAM_FINISH_GRID", "GET_SUMMARY", "BDate", from, to);
        }
        public TblBeamFinish SaveBeamFinish(TblBeamFinish master)
        {
            var res = new TblBeamFinish();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateBeamFinish("SP_INSERT_BEAM_FINISH_MASTER_INFO", "SAVE_MASTER", master);
                res.SaveStatus = Operation.Success.ToString();
                res.BID = Convert.ToInt32(dt.Rows[0]["BID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateBeamFinish(string procedure, string callname, TblBeamFinish master)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@BID", master.BID));
            cmd.Parameters.Add(new SqlParameter("@BDate", master.BDate.Value.ToString("yyyy/MM/dd")));
            cmd.Parameters.Add(new SqlParameter("@UCode", master.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", master.UName));
            cmd.Parameters.Add(new SqlParameter("@Remarks", master.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public TblBeamFinishDetails SaveBeamFinishDetail(TblBeamFinishDetails detail)
        {
            var res = new TblBeamFinishDetails();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateBeamFinishDetail("SP_INSERT_BEAM_FINISH_DETAIL_INFO", "SAVE_DETAIL", detail);
                res.SaveStatus = Operation.Success.ToString();
                res.BIID = Convert.ToInt32(dt.Rows[0]["BIID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateBeamFinishDetail(string procedure, string callname, TblBeamFinishDetails detail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@BIID", detail.BIID));
            cmd.Parameters.Add(new SqlParameter("@BID", detail.BID));
            cmd.Parameters.Add(new SqlParameter("@Loom", detail.Loom));
            cmd.Parameters.Add(new SqlParameter("@SetNo", detail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SS", detail.SS));
            cmd.Parameters.Add(new SqlParameter("@BeamNo", detail.BeamNo));
            cmd.Parameters.Add(new SqlParameter("@Remarks", detail.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

    }
}