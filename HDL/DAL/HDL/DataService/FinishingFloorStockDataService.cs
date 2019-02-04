using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;

 namespace DAL.HDL.DataService
{
    public class FinishingFloorStockDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();
        public string SaveMasterInfo(FinishingStockMaster objMaster)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_MasterInfo("sp_insert_finishing_floor_stock_master_info", "SAVE_FINISHING_STOCK_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["FID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, FinishingStockMaster objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@FID", objMaster.FID));
            cmd.Parameters.Add(new SqlParameter("@FDate", objMaster.FDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objMaster.Remarks));
            cmd.Parameters.Add(new SqlParameter("@Stock", objMaster.Stock));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public string SaveRecInfo(FinishingStockRec objRec)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_RecInfo("sp_insert_finishing_stock_rec_info", "SAVE_FINISHING_STOCK_REC", objRec);
                rv = Operation.Success.ToString();
                return result.Rows[0]["FIID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_RecInfo(string procedure, string callname, FinishingStockRec objRec)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@FIID", objRec.FIID));
            cmd.Parameters.Add(new SqlParameter("@FID", objRec.FID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", objRec.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SSNo", objRec.SSNo));
            cmd.Parameters.Add(new SqlParameter("@Loom", objRec.Loom));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", objRec.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", objRec.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@RecQnty", objRec.RecQnty));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objRec.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }


        public string SaveDisInfo(FinishingStockDispatch objDis)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_disInfo("sp_insert_finishing_stock_dispatch_info", "SAVE_FINISHING_STOCK_DISPATCH", objDis);
                rv = Operation.Success.ToString();
                return result.Rows[0]["FIID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_disInfo(string procedure, string callname, FinishingStockDispatch objDis)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@FIID", objDis.FIID));
            cmd.Parameters.Add(new SqlParameter("@FID", objDis.FID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", objDis.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SSNo", objDis.SSNo));
            cmd.Parameters.Add(new SqlParameter("@Loom", objDis.Loom));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", objDis.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", objDis.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@Dispatch", objDis.Dispatch));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objDis.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public GridEntity<FinishingStockMaster> GetStockSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<FinishingStockMaster>.GetGridData_5(options, "sp_select_finishing_stock_grid", "GET_STOCK_SUMMARY", "FID", dateFrom, dateTo);
        }

        public List<FinishingStockRec> GetStockRec(int FID)
        {
            return _service.Select_Data_List<FinishingStockRec>("sp_select_finishing_Stock_info", "GET_FINISHING_STOCK_REC_BY_FID", FID.ToString()).ToList();
        }
        
         public List<FinishingStockDispatch> GetStockDis(int FID)
        {
            return _service.Select_Data_List<FinishingStockDispatch>("sp_select_finishing_Stock_info", "GET_FINISHING_STOCK_DISPATCH_BY_FID", FID.ToString()).ToList();
        }


    }
}
