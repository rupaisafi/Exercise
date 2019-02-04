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
    public class FabRejRefinDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<MachineEntity> GetAllMachine()
        {
            return _service.Select_Data_List<MachineEntity>("sp_select_Insp_Rejection_Refinish_info", "GET_ALL_MACHINE_NAME").ToList();
        }
        
        public List<InspDyeInfo> GetFTYPE()
        {
            return _service.Select_Data_List<InspDyeInfo>("sp_select_Insp_Rejection_Refinish_info", "GET_ALL_FTYPE").ToList();
        }
        public List<InspDyeInfo> GetDyeInfo()
        {
            return _service.Select_Data_List<InspDyeInfo>("sp_select_Insp_Rejection_Refinish_info", "GET_ALL_DYEING_INFORMATION").ToList();
        }
        public List<MachineEntity> GetTCode()
        {
            return _service.Select_Data_List<MachineEntity>("sp_select_Insp_Rejection_Refinish_info", "GET_TCODE").ToList();
        }
        public List<RefinishFault> GetFTYPERefinish()
        {
            return _service.Select_Data_List<RefinishFault>("sp_select_Insp_Rejection_Refinish_info", "GET_ALL_FTYPE_REFINISH").ToList();
        }
        public List<EmployeeInfo> GetAllPO()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_Insp_Rejection_Refinish_info", "GET_ALL_PO").ToList();
        }
        public List<Department> GetAllChqDCode()
        {
            return _service.Select_Data_List<Department>("sp_select_Insp_Rejection_Refinish_info", "GET_ALL_ChQDCode").ToList();
        }
        public GridEntity<InspRejectionMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<InspRejectionMaster>.GetGridData_5(options, "sp_select_Insp_rejection_refinish_grid", "GET_PRODUCTION_SUMMARY", "ID", dateFrom, dateTo);
        }
        public string SaveMasterInfo(InspRejectionMaster objMaster)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_MasterInfo("sp_insert_insp_rejection_refinish_master_info", "SAVE_INS_REJ_REFIN_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["ID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, InspRejectionMaster objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", objMaster.ID));
            cmd.Parameters.Add(new SqlParameter("@SDate", objMaster.SDate));
            cmd.Parameters.Add(new SqlParameter("@UCode", objMaster.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", objMaster.UName));
            cmd.Parameters.Add(new SqlParameter("@TotalProd", objMaster.TotalProd));
            cmd.Parameters.Add(new SqlParameter("@UserName", objMaster.UserName));
            cmd.Parameters.Add(new SqlParameter("@InsFloorCode", objMaster.InsFloorCode));
            cmd.Parameters.Add(new SqlParameter("@InsFloorName", objMaster.InsFloorName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public string SaveRecInfo(InspRejectionDetail objRec)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_RejInfo("sp_insert_insp_rejection_detail_info", "SAVE_INS_REJ_DETAIL", objRec);
                rv = Operation.Success.ToString();
                return result.Rows[0]["DID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_RejInfo(string procedure, string callname, InspRejectionDetail objRec)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@DID", objRec.DID));
            cmd.Parameters.Add(new SqlParameter("@ID", objRec.ID));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", objRec.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", objRec.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@Beam", objRec.Beam));
            cmd.Parameters.Add(new SqlParameter("@Weight", objRec.Weight));
            cmd.Parameters.Add(new SqlParameter("@Constraction", objRec.Constraction));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objRec.Remarks));
            cmd.Parameters.Add(new SqlParameter("@SetNo", objRec.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SS", objRec.SS));
            cmd.Parameters.Add(new SqlParameter("@Loom", objRec.Loom));
            cmd.Parameters.Add(new SqlParameter("@ProdB", objRec.ProdB));
            cmd.Parameters.Add(new SqlParameter("@ProdC", objRec.ProdC));
            cmd.Parameters.Add(new SqlParameter("@CutPieece", objRec.CutPieece));
            cmd.Parameters.Add(new SqlParameter("@Wastage", objRec.Wastage));
            cmd.Parameters.Add(new SqlParameter("@FCode", objRec.FCode));
            cmd.Parameters.Add(new SqlParameter("@FType", objRec.FType));
            cmd.Parameters.Add(new SqlParameter("@DCode", objRec.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", objRec.DName));
            cmd.Parameters.Add(new SqlParameter("@WeavDate", objRec.WeavDate));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode", objRec.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@ShiftName", objRec.ShiftName));
            cmd.Parameters.Add(new SqlParameter("@UserName", objRec.UserName));
            cmd.Parameters.Add(new SqlParameter("@UCode", objRec.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", objRec.UName));
            cmd.Parameters.Add(new SqlParameter("@FMCCode", objRec.FMCCode));
            cmd.Parameters.Add(new SqlParameter("@FMCName", objRec.FMCName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public string SaveReFinishInfo(InspRefinishDetail objRe)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_ReFinishInfo("sp_insert_insp_refinish_detail_info", "SAVE_INS_REFIN_DETAIL", objRe);
                rv = Operation.Success.ToString();
                return result.Rows[0]["DID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_ReFinishInfo(string procedure, string callname, InspRefinishDetail objRe)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@DID", objRe.DID));
            cmd.Parameters.Add(new SqlParameter("@ID", objRe.ID));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", objRe.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", objRe.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@SetNo", objRe.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SS", objRe.SS));
            cmd.Parameters.Add(new SqlParameter("@Beam", objRe.Beam));
            cmd.Parameters.Add(new SqlParameter("@FCode", objRe.FCode));
            cmd.Parameters.Add(new SqlParameter("@FType", objRe.FType));
            cmd.Parameters.Add(new SqlParameter("@Prod", objRe.Prod));
            cmd.Parameters.Add(new SqlParameter("@FinishDate", objRe.FinishDate));
            cmd.Parameters.Add(new SqlParameter("@POCode", objRe.POCode));
            cmd.Parameters.Add(new SqlParameter("@POName", objRe.POName));
            cmd.Parameters.Add(new SqlParameter("@ChqDCode", objRe.ChqDCode));
            cmd.Parameters.Add(new SqlParameter("@ChqDName", objRe.ChqDName));
            cmd.Parameters.Add(new SqlParameter("@DCode", objRe.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", objRe.DName));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objRe.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public List<InspRejectionDetail> GetRejectionByID(string ID)
        {
            return _service.Select_Data_List<InspRejectionDetail>("sp_select_Insp_Rejection_Refinish_info", "GET_INSP_REJECTION_BY_ID", ID.ToString()).ToList();
        }
        public List<InspRefinishDetail> GetRefinishByID(string ID)
        {
            return _service.Select_Data_List<InspRefinishDetail>("sp_select_Insp_Rejection_Refinish_info", "GET_INSP_REFINISH_BY_ID", ID.ToString()).ToList();
        }

    }
}
