using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
   public class FinishingRubberBeltDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<RubberBelt> GetBeltType()
        {
            return _service.Select_Data_List<RubberBelt>("sp_select_finishing_rubber_belt_info", "GET_RUBBER_BELT_TYPE").ToList();
        }
        
        public List<RubberBeltDetail> GetDetailByID(int RID)
        {
            return _service.Select_Data_List<RubberBeltDetail>("sp_select_finishing_rubber_belt_info", "GET_RUBBER_BELT_DETAIL", RID.ToString()).ToList();
        }
        public GridEntity<RubberBelt> GetProductionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<RubberBelt>.GetGridData_5(options, "sp_select_finishing_rubber_belt_grid", "GET_PRODUCTION_SUMMARY", "RID", dateFrom, dateTo);
        }
        public string SaveMasterInfo(RubberBelt objMaster)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_MasterInfo("sp_insert_finishing_rubberb_belt_master_info", "SAVE_FINISHING_RUBBER_BELT_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["RID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, RubberBelt objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@RID", objMaster.RID));

            cmd.Parameters.Add(new SqlParameter("@MCNo", objMaster.MCNo));
            cmd.Parameters.Add(new SqlParameter("@SettingDate", objMaster.SettingDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@BName", objMaster.BName));
            cmd.Parameters.Add(new SqlParameter("@OCountry", objMaster.OCountry));
            cmd.Parameters.Add(new SqlParameter("@SerialNo", objMaster.SerialNo));
            cmd.Parameters.Add(new SqlParameter("@ThicknessMM", objMaster.ThicknessMM));
            cmd.Parameters.Add(new SqlParameter("@Hardness", objMaster.Hardness));
            cmd.Parameters.Add(new SqlParameter("@Width", objMaster.Width));
            cmd.Parameters.Add(new SqlParameter("@Type", objMaster.Type));
            cmd.Parameters.Add(new SqlParameter("@Remarks ", objMaster.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        
        public string SaveDetailInfo(RubberBeltDetail objDetail)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_Detail_Info("sp_insert_finishing_rubber_belt_detail_info", "SAVE_FINISHING_RUBBER_BELT_DETAIL", objDetail);
                rv = Operation.Success.ToString();
                return result.Rows[0]["RIID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_Detail_Info(string procedure, string callname, RubberBeltDetail objDetail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@RIID", objDetail.RIID));
            cmd.Parameters.Add(new SqlParameter("@RID", objDetail.RID));
            cmd.Parameters.Add(new SqlParameter("@GDate", objDetail.GDate));
            cmd.Parameters.Add(new SqlParameter("@BeforeThickness", objDetail.BeforeThickness));
            cmd.Parameters.Add(new SqlParameter("@AfterThickness", objDetail.AfterThickness));
            cmd.Parameters.Add(new SqlParameter("@AfterHardness", objDetail.AfterHardness));
            cmd.Parameters.Add(new SqlParameter("@ProdQnty", objDetail.ProdQnty));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objDetail.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}
