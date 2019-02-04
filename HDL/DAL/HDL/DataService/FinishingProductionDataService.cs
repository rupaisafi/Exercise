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
    public class FinishingProductionDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<WeavingProduction> GetFinishingBeamNo(string setNo,string SLNo)
        {
            return _service.Select_Data_List<WeavingProduction>("sp_select_finishing_production_info", "GET_WEAVING_BEAM_NO", setNo, SLNo).ToList();
        }
        public List<DyeingProdDetailsSizingSlasherRope> GetProductionSLNo(string setNo)
        {
            return _service.Select_Data_List<DyeingProdDetailsSizingSlasherRope>("sp_select_finishing_production_info", "GET_SS_NO_BY_SETNO", setNo).ToList();
        }
        public List<ProdTypeFinishing> GetAllProdType()
        {
            return _service.Select_Data_List<ProdTypeFinishing>("sp_select_finishing_production_info", "GET_PROD_TYPE").ToList();
        }
        public List<EmployeeInfo> GetFinishingOperator()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_finishing_production_info", "GET_OPERATOR_NAME").ToList();
        }
        
        public List<FinishRoute> GetFinishingRoute()
        {
            return _service.Select_Data_List<FinishRoute>("sp_select_finishing_production_info", "GET_FINISHING_ROUTE").ToList();
        }
        public GridEntity<FinisgingProductionMaster> GetProductionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<FinisgingProductionMaster>.GetGridData_5(options, "sp_select_finishing_production_grid", "GET_PRODUCTION_SUMMARY","FID", dateFrom, dateTo);
        }
        public List<FinishingProductionDetail> GetProductionDetail(int FID)
        {
            return _service.Select_Data_List<FinishingProductionDetail>("sp_select_finishing_production_info", "GET_FINISHING_PRODUCTION_DETAIL_BY_FID", FID.ToString()).ToList();
        }
        
        public string SaveMasterInfo(FinisgingProductionMaster objMaster)
        {
            string rv = "";
            try
            {
              var result=  Insert_Update_MasterInfo("sp_insert_finishing_Production_master_info", "SAVE_FINISHING_PRODUCTION_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["FID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, FinisgingProductionMaster objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@FID", objMaster.FID));
            cmd.Parameters.Add(new SqlParameter("@FDate", objMaster.FDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode", objMaster.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@Shift", objMaster.Shift));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objMaster.Remarks));
            cmd.Parameters.Add(new SqlParameter("@UserName", objMaster.UserName));
            cmd.Parameters.Add(new SqlParameter("@MCRunTime", objMaster.MCRunTime));
            cmd.Parameters.Add(new SqlParameter("@MCOffTime", objMaster.MCOffTime));
            cmd.Parameters.Add(new SqlParameter("@MCName", objMaster.MCName));
            cmd.Parameters.Add(new SqlParameter("@MCCode ", objMaster.MCCode));
            cmd.Parameters.Add(new SqlParameter("@PType ", objMaster.PType));
            cmd.Parameters.Add(new SqlParameter("@PCode ", objMaster.PCode));
            cmd.Parameters.Add(new SqlParameter("@DCode", objMaster.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", objMaster.DName));
            cmd.Parameters.Add(new SqlParameter("@UCode", objMaster.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", objMaster.UName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public string SaveDetailInfo(FinishingProductionDetail objDetail)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_DetailInfo("sp_insert_finishing_Production_detail_info", "SAVE_FINISHING_PRODUCTION_DETAIL", objDetail);
                rv = Operation.Success.ToString();
                return result.Rows[0]["FPID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_DetailInfo(string procedure, string callname, FinishingProductionDetail objDetail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@FPID ", objDetail.FPID));
            cmd.Parameters.Add(new SqlParameter("@FID ", objDetail.FID));
            cmd.Parameters.Add(new SqlParameter("@BeamNo ", objDetail.BeamNo));
            cmd.Parameters.Add(new SqlParameter("@SizingNo ", objDetail.SizingNo));
            cmd.Parameters.Add(new SqlParameter("@LoomNo ", objDetail.LoomNo));
            cmd.Parameters.Add(new SqlParameter("@StyleCode ", objDetail.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@Weave ", objDetail.Weave));
            cmd.Parameters.Add(new SqlParameter("@Color ", objDetail.Color));
            cmd.Parameters.Add(new SqlParameter("@Weight ", objDetail.Weight));
            cmd.Parameters.Add(new SqlParameter("@Width ", objDetail.Width));
            cmd.Parameters.Add(new SqlParameter("@BeamLenght ", objDetail.BeamLenght));
            cmd.Parameters.Add(new SqlParameter("@FabShrinkage ", objDetail.FabShrinkage));
            cmd.Parameters.Add(new SqlParameter("@BeforeFin ", objDetail.BeforeFin));
            cmd.Parameters.Add(new SqlParameter("@AfterFin ", objDetail.AfterFin));
            cmd.Parameters.Add(new SqlParameter("@AfterFinShrinkage ", objDetail.AfterFinShrinkag));
            cmd.Parameters.Add(new SqlParameter("@TotalProd ", objDetail.TotalProd));
            cmd.Parameters.Add(new SqlParameter("@TotalPoint ", objDetail.TotalPoint));
            cmd.Parameters.Add(new SqlParameter("@Remnarks ", objDetail.Remnarks));
            cmd.Parameters.Add(new SqlParameter("@SetNo ", objDetail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@TrollyNo ", objDetail.TrollyNo));
            cmd.Parameters.Add(new SqlParameter("@BeforeWidth ", objDetail.BeforeWidth));
            cmd.Parameters.Add(new SqlParameter("@AfterWidth ", objDetail.AfterWidth));
            cmd.Parameters.Add(new SqlParameter("@Skew ", objDetail.Skew));
            cmd.Parameters.Add(new SqlParameter("@Buyer ", objDetail.Buyer));
            cmd.Parameters.Add(new SqlParameter("@OCode ", objDetail.OCode));
            cmd.Parameters.Add(new SqlParameter("@OName ", objDetail.OName));
            cmd.Parameters.Add(new SqlParameter("@OpCode ", objDetail.OpCode));
            cmd.Parameters.Add(new SqlParameter("@OpName ", objDetail.OpName));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode ", objDetail.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@Conostration ", objDetail.Conostration));
            cmd.Parameters.Add(new SqlParameter("@FConstraction ", objDetail.FConstraction));
            cmd.Parameters.Add(new SqlParameter("@UserName ", objDetail.UserName));
            cmd.Parameters.Add(new SqlParameter("@MCRunTime ", objDetail.MCRunTime));
            cmd.Parameters.Add(new SqlParameter("@MCOffTime ", objDetail.MCOffTime));
            cmd.Parameters.Add(new SqlParameter("@Temparature ", objDetail.Temparature));
            cmd.Parameters.Add(new SqlParameter("@RPM ", objDetail.RPM));
            cmd.Parameters.Add(new SqlParameter("@ProdCode ", objDetail.ProdCode));
            cmd.Parameters.Add(new SqlParameter("@ProdType ", objDetail.ProdType));
            cmd.Parameters.Add(new SqlParameter("@FinishRoute ", objDetail.FinishRoute));
            cmd.Parameters.Add(new SqlParameter("@UCode ", objDetail.UCode));
            cmd.Parameters.Add(new SqlParameter("@Moisture ", objDetail.Moisture));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }


    }
}
