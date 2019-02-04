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
    public class BeamStockDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<ObjectModel> GetAllSetNo()
        {
            return _service.Select_Data_List<ObjectModel>("SP_SELECT_BEAM_STOCK_INFO", "GET_ALL_SET_NO");
        }
        public List<Department> GetAllDepartment()
        {
            return _service.Select_Data_List<Department>("SP_SELECT_BEAM_STOCK_INFO", "GET_ALL_DEPARTMENT");
        }
        public List<ProductionType> GetAllProductionType()
        {
            return _service.Select_Data_List<ProductionType>("SP_SELECT_BEAM_STOCK_INFO", "GET_ALL_PRODUCTION_TYPE");
        }

        public List<TblBeamStockDetails> GetDetails(string masterID)
        {
            return _service.Select_Data_List<TblBeamStockDetails>("SP_SELECT_BEAM_STOCK_INFO", "GET_DETAILS", masterID);
        }
        public GridEntity<TblBeamStock> GetSummary(GridOptions options, string from, string to)
        {
            return KendoGrid<TblBeamStock>.GetGridData_5(options, "SP_SELECT_BEAM_STOCK_GRID", "GET_SUMMARY", "BDate", from, to);
        }

        public TblBeamStock SaveBeamStock(TblBeamStock master)
        {
            var res = new TblBeamStock();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateBeamStock("SP_INSERT_BEAM_STOCK_MASTER_INFO", "SAVE_MASTER", master);
                res.SaveStatus = Operation.Success.ToString();
                res.BID = Convert.ToInt32(dt.Rows[0]["BID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateBeamStock(string procedure, string callname, TblBeamStock master)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@BID", master.BID));
            cmd.Parameters.Add(new SqlParameter("@BDate", master.BDate.Value.ToString("yyyy/MM/dd")));
            cmd.Parameters.Add(new SqlParameter("@UCode", master.UCode));
            cmd.Parameters.Add(new SqlParameter("@DCode", master.DCode));
            cmd.Parameters.Add(new SqlParameter("@UName", master.UName));
            cmd.Parameters.Add(new SqlParameter("@DName", master.DName));
            cmd.Parameters.Add(new SqlParameter("@Remarks", master.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public TblBeamStockDetails SaveBeamStockDetail(TblBeamStockDetails detail)
        {
            var res = new TblBeamStockDetails();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateBeamStockDetail("SP_INSERT_BEAM_STOCK_DETAIL_INFO", "SAVE_DETAIL", detail);
                res.SaveStatus = Operation.Success.ToString();
                res.BIID = Convert.ToInt32(dt.Rows[0]["BIID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateBeamStockDetail(string procedure, string callname, TblBeamStockDetails detail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@BIID", detail.BIID));
            cmd.Parameters.Add(new SqlParameter("@BID", detail.BID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", detail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", detail.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@SS", detail.SS));
            cmd.Parameters.Add(new SqlParameter("@BeamNo1", detail.BeamNo1));
            cmd.Parameters.Add(new SqlParameter("@Length", detail.Length));
            cmd.Parameters.Add(new SqlParameter("@Value", detail.Value));
            cmd.Parameters.Add(new SqlParameter("@BeamNo", detail.BeamNo));
            cmd.Parameters.Add(new SqlParameter("@WarpCount", detail.WarpCount));
            cmd.Parameters.Add(new SqlParameter("@PDate", detail.PDate.Value.ToString("yyyy/MM/dd")));
            cmd.Parameters.Add(new SqlParameter("@StockDays", detail.StockDays));
            cmd.Parameters.Add(new SqlParameter("@PType", detail.PType));
            cmd.Parameters.Add(new SqlParameter("@PCode", detail.PCode));
            cmd.Parameters.Add(new SqlParameter("@Construction", detail.Construction));
            cmd.Parameters.Add(new SqlParameter("@Remarks", detail.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

    }
}