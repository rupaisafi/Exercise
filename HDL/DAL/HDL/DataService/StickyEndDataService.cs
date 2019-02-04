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
    public class StickyEndDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;

        readonly CommonDataService _service = new CommonDataService();
        //asdf
        public GridEntity<StickyEnds> GetSummary(GridOptions options, string from, string to)
        {
            return KendoGrid<StickyEnds>.GetGridData_5(options, "SP_SELECT_STICKY_END_GRID", "GET_SUMMARY", "SDate", from, to);
        }
        public GridEntity<StickyEndsDetails> GetDetail(GridOptions options, string sID)
        {
            return KendoGrid<StickyEndsDetails>.GetGridData_5(options, "SP_SELECT_STICKY_END_GRID", "GET_DETAIL", "SID", sID);
        }
        public StickyEnds SaveStickyEnd(StickyEnds stickyEnd)
        {
            var res = new StickyEnds();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateStickyEnd("sp_insert_sticky_end", "save_sticky_end", stickyEnd);
                res.SaveStatus = Operation.Success.ToString();
                res.SID = Convert.ToInt32(dt.Rows[0]["SID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateStickyEnd(string procedure, string callname, StickyEnds stickyEnd)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@SID", stickyEnd.SID));
            cmd.Parameters.Add(new SqlParameter("@SDate", stickyEnd.SDate));
            cmd.Parameters.Add(new SqlParameter("@DCode", stickyEnd.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", stickyEnd.DName));
            cmd.Parameters.Add(new SqlParameter("@UCode", stickyEnd.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", stickyEnd.UName));
            cmd.Parameters.Add(new SqlParameter("@Remarks", stickyEnd.Remarks));
            cmd.Parameters.Add(new SqlParameter("@TrackDate", stickyEnd.TrackDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public StickyEndsDetails SaveStickyEndDeatil(StickyEndsDetails stickyEndDetail)
        {
            var res = new StickyEndsDetails();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateStickyEndDetail("sp_insert_sticky_end", "save_sticky_end", stickyEndDetail);
                res.SaveStatus = Operation.Success.ToString();
                res.SIID = Convert.ToInt32(dt.Rows[0]["SIID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateStickyEndDetail(string procedure, string callname, StickyEndsDetails stickyEndDetail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@SIID", stickyEndDetail.SIID));
            cmd.Parameters.Add(new SqlParameter("@SID", stickyEndDetail.SID));
            cmd.Parameters.Add(new SqlParameter("@Loom", stickyEndDetail.Loom));
            cmd.Parameters.Add(new SqlParameter("@SetNo", stickyEndDetail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", stickyEndDetail.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@SSNo", stickyEndDetail.SSNo));
            cmd.Parameters.Add(new SqlParameter("@BeamNo", stickyEndDetail.BeamNo));
            cmd.Parameters.Add(new SqlParameter("@TEnds", stickyEndDetail.TEnds));
            cmd.Parameters.Add(new SqlParameter("@Knott", stickyEndDetail.Knott));
            cmd.Parameters.Add(new SqlParameter("@ByPass2ndDay", stickyEndDetail.ByPass2ndDay));
            cmd.Parameters.Add(new SqlParameter("@Remarks", stickyEndDetail.Remarks));
            cmd.Parameters.Add(new SqlParameter("@BeamLength", stickyEndDetail.BeamLength));
            cmd.Parameters.Add(new SqlParameter("@ByPass1stDay", stickyEndDetail.ByPass1stDay));
            cmd.Parameters.Add(new SqlParameter("@SizingD", stickyEndDetail.SizingD));
            cmd.Parameters.Add(new SqlParameter("@SizingW", stickyEndDetail.SizingW));
            cmd.Parameters.Add(new SqlParameter("@GConstruction", stickyEndDetail.GConstruction));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}