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
    public class InspectionFloorStockDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();
        public string SaveMasterInfo(InspectionFloorStockMaster objMaster)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_MasterInfo("sp_insert_insp_floor_stock_master_info", "SAVE_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["ID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, InspectionFloorStockMaster objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", objMaster.ID));
            cmd.Parameters.Add(new SqlParameter("@IDate", objMaster.IDate));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objMaster.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public string SaveDetailInfo(InspectionFloorStockDetail obj)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_DetailInfo("sp_insert_insp_floor_stock_detail_info", "SAVE_DETAIL", obj);
                rv = Operation.Success.ToString();
                return result.Rows[0]["DID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_DetailInfo(string procedure, string callname, InspectionFloorStockDetail obj)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@DID", obj.DID));
            cmd.Parameters.Add(new SqlParameter("@ID", obj.ID));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", obj.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", obj.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@Qnty", obj.Qnty));
            cmd.Parameters.Add(new SqlParameter("@Remarks", obj.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public GridEntity<InspectionFloorStockMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<InspectionFloorStockMaster>.GetGridData_5(options, "sp_select_Insp_floor_stock_grid", "GET_SUMMARY", "ID", dateFrom, dateTo);
        }
        public List<InspectionFloorStockDetail> GetDetailByID(string ID)
        {
            return _service.Select_Data_List<InspectionFloorStockDetail>("sp_select_Insp_floor_stock_info", "GET_DETAIL_BY_ID", ID.ToString()).ToList();
        }
    }
}
