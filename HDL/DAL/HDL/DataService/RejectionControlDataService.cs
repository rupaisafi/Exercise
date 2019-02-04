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
    public class RejectionControlDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<tblDyeingInformation> GetAllFaultType()
        {
            return _service.Select_Data_List<tblDyeingInformation>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_FAULT_TYPE");
        }
        public List<EmployeeInfo> GetAllOperator(string setNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_OPERATOR", setNo);
        }
        public List<EmployeeInfo> GetAllCaptain(string setNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_CAPTAIN", setNo);
        }

        
        public List<EmployeeInfo> GetAllDyeingPO()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYEING_PO");
        }
        public List<EmployeeInfo> GetAllDyeingSizer()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYEING_SIZER");
        }
        public List<TblEmployeeCaptain> GetAllDyeingCaptain()
        {
            return _service.Select_Data_List<TblEmployeeCaptain>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYEING_CAPTAIN");
        }
        public List<EmployeeInfo> GetAllDyeingOP(string setNo, string ssNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYEING_OP", setNo, ssNo);
        }

        public List<EmployeeInfo> GetAllWeavingOP(string loomName, string weaveDate,string shiftCode)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_WEAVING_OP", loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingPO(string loomName, string weaveDate, string shiftCode)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_WEAVING_PO", loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingLineman(string loomName, string weaveDate, string shiftCode)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_WEAVING_LINEMAN", loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingFitter(string loomName, string weaveDate, string shiftCode)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_WEAVING_FITTER", loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingCaptain(string loomName, string weaveDate, string shiftCode)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_WEAVING_CAPTAIN", loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingInFitter(string loomName, string weaveDate, string shiftCode)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_WEAVING_INFITTER", loomName, weaveDate, shiftCode);
        }

        public List<MachineEntity> GetAllFinishingMC()
        {
            return _service.Select_Data_List<MachineEntity>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_FINISHING_MC");
        }
        public List<EmployeeInfo> GetAllFinishingOperator(string setNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYE_STOP_ROPE_OP", setNo);
        }
        public List<EmployeeInfo> GetAllFinishingCaptain(string setNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYE_STOP_ROPE_CAPTAIN", setNo);
        }
        
        public List<EmployeeInfo> GetAllDyeStopRopeOperator(string setNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYE_STOP_ROPE_OP", setNo);
        }
        public List<EmployeeInfo> GetAllDyeStopRopeCaptain(string setNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_DYE_STOP_ROPE_CAPTAIN", setNo);
        }

        public List<TblInsFaltDetail> GetWarpingDetail(string masterID)
        {
            return _service.Select_Data_List<TblInsFaltDetail>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_REJECTION_CONTROL_WARPING", masterID);
        }
        public List<TblInsFaltDetail> GetDyeingDetail(string masterID)
        {
            return _service.Select_Data_List<TblInsFaltDetail>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_REJECTION_CONTROL_DYEING", masterID);
        }
        public List<TblInsFaltDetail> GetWeavingDetail(string masterID)
        {
            return _service.Select_Data_List<TblInsFaltDetail>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_REJECTION_CONTROL_WEAVING", masterID);
        }
        public List<TblInsFaltDetail> GetFinishingDetail(string masterID)
        {
            return _service.Select_Data_List<TblInsFaltDetail>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_REJECTION_CONTROL_FINISHING", masterID);
        }
        public List<TblInsFaltDetail> GetDyeStopRopeDetail(string masterID)
        {
            return _service.Select_Data_List<TblInsFaltDetail>("SP_SELECT_INSPECTION_REJECTION_CONTROL_INFO", "GET_ALL_REJECTION_CONTROL_DYESTOPROPE", masterID);
        }
        public GridEntity<TblInsFalt> GetSummary(GridOptions options, string from, string to)
        {
            return KendoGrid<TblInsFalt>.GetGridData_5(options, "SP_SELECT_INSPECTION_REJECTION_CONTROL_GRID", "GET_SUMMARY", "SDate", from, to);
        }
        public TblInsFaltDetail SaveInspectionFaultDetail(TblInsFaltDetail detail)
        {
            var res = new TblInsFaltDetail();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateInspectionFaultDetail("SP_INSERT_INSPECTION_REJECTION_CONTROL_DETAIL_INFO", "SAVE_INSPECTION_REJECTION_CONTROL_WARPING_DETAIL", detail);
                res.SaveStatus = Operation.Success.ToString();
                res.DID = Convert.ToInt32(dt.Rows[0]["DID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateInspectionFaultDetail(string procedure, string callname, TblInsFaltDetail detail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@DID", detail.DID));
            cmd.Parameters.Add(new SqlParameter("ID", detail.ID));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", detail.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", detail.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@Weight", detail.Weight));
            cmd.Parameters.Add(new SqlParameter("@Constraction", detail.Constraction));
            cmd.Parameters.Add(new SqlParameter("@Weave", detail.Weave));
            cmd.Parameters.Add(new SqlParameter("@Colour", detail.Colour));
            cmd.Parameters.Add(new SqlParameter("@Width", detail.Width));
            cmd.Parameters.Add(new SqlParameter("@Prod", detail.Prod));
            cmd.Parameters.Add(new SqlParameter("@Remarks", detail.Remarks));
            cmd.Parameters.Add(new SqlParameter("@CCode", detail.CCode));
            cmd.Parameters.Add(new SqlParameter("@CName", detail.CName));
            cmd.Parameters.Add(new SqlParameter("@TotalRoll", detail.TotalRoll));
            cmd.Parameters.Add(new SqlParameter("@TotalPoint", detail.TotalPoint));
            cmd.Parameters.Add(new SqlParameter("@SetNo", detail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SS", detail.SS));
            cmd.Parameters.Add(new SqlParameter("@Loom", detail.Loom));
            cmd.Parameters.Add(new SqlParameter("@Beam", detail.Beam));
            cmd.Parameters.Add(new SqlParameter("@ProdB", detail.ProdB));
            cmd.Parameters.Add(new SqlParameter("@ProdC", detail.ProdC));
            cmd.Parameters.Add(new SqlParameter("@CutPieece", detail.CutPieece));
            cmd.Parameters.Add(new SqlParameter("@Wastage", detail.Wastage));
            cmd.Parameters.Add(new SqlParameter("@ProdG", detail.ProdG));
            cmd.Parameters.Add(new SqlParameter("@TotalProd", detail.TotalProd));
            cmd.Parameters.Add(new SqlParameter("@FCode", detail.FCode));
            cmd.Parameters.Add(new SqlParameter("@FType", detail.FType));
            cmd.Parameters.Add(new SqlParameter("@DCode", detail.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", detail.DName));
            cmd.Parameters.Add(new SqlParameter("@OName", detail.OName));
            cmd.Parameters.Add(new SqlParameter("@OCode", detail.OCode));
            cmd.Parameters.Add(new SqlParameter("@POName", detail.POName));
            cmd.Parameters.Add(new SqlParameter("@POCode", detail.POCode));
            cmd.Parameters.Add(new SqlParameter("@SzCode", detail.SzCode));
            cmd.Parameters.Add(new SqlParameter("@SzName", detail.SzName));
            cmd.Parameters.Add(new SqlParameter("@CaptainName", detail.CaptainName));
            cmd.Parameters.Add(new SqlParameter("@CaptainCode", detail.CaptainCode));
            cmd.Parameters.Add(new SqlParameter("@WeavDate", detail.WeavDate));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode", detail.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@ShiftName", detail.ShiftName));
            cmd.Parameters.Add(new SqlParameter("@UserName", detail.UserName));
            cmd.Parameters.Add(new SqlParameter("@EDate", detail.EDate));
            cmd.Parameters.Add(new SqlParameter("@LineManName", detail.LineManName));
            cmd.Parameters.Add(new SqlParameter("@LineManCode", detail.LineManCode));
            cmd.Parameters.Add(new SqlParameter("@SuperVisorName", detail.SuperVisorName));
            cmd.Parameters.Add(new SqlParameter("@SuperVisorCode", detail.SuperVisorCode));
            cmd.Parameters.Add(new SqlParameter("@FitterName", detail.FitterName));
            cmd.Parameters.Add(new SqlParameter("@FitterCode", detail.FitterCode));
            cmd.Parameters.Add(new SqlParameter("@OPNo", detail.OPNo));
            cmd.Parameters.Add(new SqlParameter("@WarpTotalQnty", detail.WarpTotalQnty));
            cmd.Parameters.Add(new SqlParameter("@InFitterName", detail.InFitterName));
            cmd.Parameters.Add(new SqlParameter("@InFitterCode", detail.InFitterCode));
            cmd.Parameters.Add(new SqlParameter("@SCode", detail.SCode));
            cmd.Parameters.Add(new SqlParameter("@SName", detail.SName));
            cmd.Parameters.Add(new SqlParameter("@LotNo", detail.LotNo));
            cmd.Parameters.Add(new SqlParameter("@UCode", detail.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", detail.UName));
            cmd.Parameters.Add(new SqlParameter("@FMCCode", detail.FMCCode));
            cmd.Parameters.Add(new SqlParameter("@FMCName", detail.FMCName));
            cmd.Parameters.Add(new SqlParameter("@FOPName", detail.FOPName));
            cmd.Parameters.Add(new SqlParameter("@FOPID", detail.FOPID));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public TblInsFalt SaveInspectionFaultMaster(TblInsFalt master)
        {
            var res = new TblInsFalt();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateInspectionFaultMaster("SP_INSERT_INSPECTION_REJECTION_CONTROL_MASTER_INFO", "SAVE_REJECTION_CONTROL_MASTER", master);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateInspectionFaultMaster(string procedure, string callname, TblInsFalt master)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", master.ID));
            cmd.Parameters.Add(new SqlParameter("@SDate", master.SDate));
            cmd.Parameters.Add(new SqlParameter("@UCode", master.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", master.UName));
            cmd.Parameters.Add(new SqlParameter("@Ref", master.Ref));
            cmd.Parameters.Add(new SqlParameter("@TotalProd", master.TotalProd));
            cmd.Parameters.Add(new SqlParameter("@Rejection", master.Rejection));
            cmd.Parameters.Add(new SqlParameter("@CutPice", master.CutPice));
            cmd.Parameters.Add(new SqlParameter("@DID", master.DID));
            cmd.Parameters.Add(new SqlParameter("@TracDate", master.TracDate));
            cmd.Parameters.Add(new SqlParameter("@UserName", master.UserName));
            cmd.Parameters.Add(new SqlParameter("@EDate", master.EDate));
            cmd.Parameters.Add(new SqlParameter("@InsFloorCode", master.InsFloorCode));
            cmd.Parameters.Add(new SqlParameter("@InsFloorName", master.InsFloorName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

    }
}