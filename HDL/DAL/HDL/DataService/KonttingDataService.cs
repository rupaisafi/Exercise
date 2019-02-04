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
    public class KonttingDataService
    {
        readonly string _connectionString;
        readonly CommonDataService _commonService;

        /// <summary>
        /// Default Constructor
        /// </summary>
        public KonttingDataService()
        {
            _commonService = new CommonDataService();
            _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        }
        /// <summary>
        /// Constructor with parameter
        /// </summary>
        /// <param name="commonService"></param>
        /// <param name="connectionString"></param>
        public KonttingDataService(CommonDataService commonService, string connectionString)
        {
            _connectionString = connectionString;
            _commonService = new CommonDataService();
        }

        public KnottingMaster SaveData(KnottingMaster master, KnottingDetail detail)
        {
            var mResponse = SaveKnottingMaster(master);
            if (mResponse.SaveStatus == Operation.Success.ToString())
            {
                detail.ID = mResponse.ID;
                var dResponse = SaveKnottingDetail(detail);
                mResponse.DetailID = dResponse.KID;
                mResponse.SaveStatus = dResponse.SaveStatus;
            }
            return mResponse;
        }
        public KnottingMaster SaveKnottingMaster(KnottingMaster master)
        {
            var dataTable = new DataTable();
            var response = new KnottingMaster();

            try
            {
                dataTable = InsertOrUpdateKnottingMaster("SP_INSERT_KNOTTING", "SAVE_OR_UPDATE", master);
                response.SaveStatus = Operation.Success.ToString();
                response.ID = Convert.ToInt32(dataTable.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                response.SaveStatus = ex.Message;
            }
            return response;
        }
        public KnottingDetail SaveKnottingDetail(KnottingDetail detail)
        {
            var dataTable = new DataTable();
            var response = new KnottingDetail();

            try
            {
                dataTable = InsertOrUpdateKnottingDetail("SP_INSERT_KNOTTING_DETAIL", "SAVE_OR_UPDATE", detail);
                response.SaveStatus = Operation.Success.ToString();
                response.KID = Convert.ToInt32(dataTable.Rows[0]["KID"].ToString());
            }
            catch (Exception ex)
            {
                response.SaveStatus = ex.Message;
            }
            return response;
        }
        public GridEntity<KnottingDetail> GetDetail(GridOptions options, string masterId)
        {
            return KendoGrid<KnottingDetail>.GetGridData_5(options, "SP_SELECT_KNOTTING_GRID", "DETAIL_GRID", "KDate", masterId);
        }
        public GridEntity<KnottingMaster> GetSummary(GridOptions options, string fromDate, string toDate)
        {
            return KendoGrid<KnottingMaster>.GetGridData_5(options, "SP_SELECT_KNOTTING_GRID", "SUMMARY_GRID", "KDate", fromDate, toDate);
        }

        public DataTable InsertOrUpdateKnottingMaster(string procedure, string callname, KnottingMaster master)
        {
            var dbConn = new SqlConnection(_connectionString);
            dbConn.Open();
            var cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", master.ID));
            cmd.Parameters.Add(new SqlParameter("@UCode", master.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", master.UName));
            cmd.Parameters.Add(new SqlParameter("@KDate", master.KDate));
            cmd.Parameters.Add(new SqlParameter("@Type", master.Type));
            cmd.Parameters.Add(new SqlParameter("@TCode", master.TCode));
            cmd.Parameters.Add(new SqlParameter("@Remarks", master.Remarks));
            cmd.Parameters.Add(new SqlParameter("@TrackDate", master.TrackDate));
            var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public DataTable InsertOrUpdateKnottingDetail(string procedure, string callname, KnottingDetail detail)
        {
            var dbConn = new SqlConnection(_connectionString);
            dbConn.Open();
            var cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@KID", detail.KID));
            cmd.Parameters.Add(new SqlParameter("@ID", detail.ID));
            cmd.Parameters.Add(new SqlParameter("@KDate", detail.KDate));
            cmd.Parameters.Add(new SqlParameter("@Loom", detail.Loom));
            cmd.Parameters.Add(new SqlParameter("@SetNo", detail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SSNo", detail.SSNo));
            cmd.Parameters.Add(new SqlParameter("@BeamNo", detail.BeamNo));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", detail.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", detail.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@Wastage", detail.Wastage));
            cmd.Parameters.Add(new SqlParameter("@PO", detail.PO));
            cmd.Parameters.Add(new SqlParameter("@Sizer", detail.Sizer));
            cmd.Parameters.Add(new SqlParameter("@Captain", detail.Captain));
            cmd.Parameters.Add(new SqlParameter("@WarpCount", detail.WarpCount));
            cmd.Parameters.Add(new SqlParameter("@SuppLot", detail.SuppLot));
            cmd.Parameters.Add(new SqlParameter("@Remarks", detail.Remarks));
            cmd.Parameters.Add(new SqlParameter("@Fault", detail.Fault));
            cmd.Parameters.Add(new SqlParameter("@UCode", detail.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", detail.UName));
            var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}