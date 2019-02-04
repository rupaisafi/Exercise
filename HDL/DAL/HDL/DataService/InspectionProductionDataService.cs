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
    public class InspectionProductionDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;

        readonly CommonDataService _service = new CommonDataService();
        //asdf
        public GridEntity<TblStock11> GetSummary(GridOptions options, string from, string to)
        {
            return KendoGrid<TblStock11>.GetGridData_5(options, "SP_SELECT_INSPECTION_PRODUCTION_GRID", "GET_SUMMARY", "ID", from, to);
        }
        public List<TblStock21> GetProductionDetail(string masterID)
        {
            return _service.Select_Data_List<TblStock21>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_PRODUCTION", masterID);
        }
        public List<TblStock22> GetOperatorProductionDetail(string masterID)
        {
            return _service.Select_Data_List<TblStock22>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_OPERATOR_PRODUCTION", masterID);
        }

        public List<SetInfoEntity> GetAllSetNo() { return _service.Select_Data_List<SetInfoEntity>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_SET_NO"); }
        public List<Style> GetAllStyleNo() { return _service.Select_Data_List<Style>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_STYLE_NO"); }
        public List<ProdType> GetAllPType() { return _service.Select_Data_List<ProdType>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_PRODUCTION_TYPE"); }
        public List<MachineEntity> GetAllFinishingMC() { return _service.Select_Data_List<MachineEntity>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_FINISH_MC"); }
        public List<tblDyeingInformation> GetAllFType() { return _service.Select_Data_List<tblDyeingInformation>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_FAULT_TYPE"); }
        public List<EmployeeInfo> GetAllOperator() { return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_OPERATOR"); }
        public List<EmployeeInfo> GetAllCaptain() { return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_INSPECTION_PRODUCTION_INFO", "GET_ALL_CAPTAIN"); }

        public TblStock11 SaveInspectionProductionMaster(TblStock11 master)
        {
            var res = new TblStock11();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateInspectionProductionMaster("SP_INSERT_INSPECTION_PRODUCTION_MASTER_INFO", "SAVE_INSPECTION_PRODUCTION_MASTER", master);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateInspectionProductionMaster(string procedure, string callname, TblStock11 master)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", master.ID));
            cmd.Parameters.Add(new SqlParameter("@SDate", master.SDate));
            cmd.Parameters.Add(new SqlParameter("@TracDate", master.TracDate));
            cmd.Parameters.Add(new SqlParameter("@Ref", master.Ref));
            cmd.Parameters.Add(new SqlParameter("@DID", master.DID));
            cmd.Parameters.Add(new SqlParameter("@DCode", master.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", master.DName));
            cmd.Parameters.Add(new SqlParameter("@UCode", master.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", master.UName));
            cmd.Parameters.Add(new SqlParameter("@TotalProd", master.TotalProd));
            cmd.Parameters.Add(new SqlParameter("@CProd", master.CProd));
            cmd.Parameters.Add(new SqlParameter("@Gramending", master.Gramending));
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
        public TblStock21 SaveInspectionProductionDetail(TblStock21 productionDetail)
        {
            var res = new TblStock21();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateInspectionProductionDetail("SP_INSERT_INSPECTION_PRODUCTION_PRODUCTION_INFO", "SAVE_INSPECTION_PRODUCTION", productionDetail);
                res.SaveStatus = Operation.Success.ToString();
                res.DID = Convert.ToInt32(dt.Rows[0]["DID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateInspectionProductionDetail(string procedure, string callname, TblStock21 productionDetail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@DID", productionDetail.DID));
            cmd.Parameters.Add(new SqlParameter("@ID", productionDetail.ID));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", productionDetail.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", productionDetail.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@Weight", productionDetail.Weight));
            cmd.Parameters.Add(new SqlParameter("@Constraction", productionDetail.Constraction));
            cmd.Parameters.Add(new SqlParameter("@Weave", productionDetail.Weave));
            cmd.Parameters.Add(new SqlParameter("@Colour", productionDetail.Colour));
            cmd.Parameters.Add(new SqlParameter("@Width", productionDetail.Width));
            cmd.Parameters.Add(new SqlParameter("@QCode", productionDetail.QCode));
            cmd.Parameters.Add(new SqlParameter("@FabQuality", productionDetail.FabQuality));
            cmd.Parameters.Add(new SqlParameter("@Prod", productionDetail.Prod));
            cmd.Parameters.Add(new SqlParameter("@FabReturn", productionDetail.FabReturn));
            cmd.Parameters.Add(new SqlParameter("@Remarks", productionDetail.Remarks));
            cmd.Parameters.Add(new SqlParameter("@CCode", productionDetail.CCode));
            cmd.Parameters.Add(new SqlParameter("@CName", productionDetail.CName));
            cmd.Parameters.Add(new SqlParameter("@TotalRoll", productionDetail.TotalRoll));
            cmd.Parameters.Add(new SqlParameter("@TotalPoint", productionDetail.TotalPoint));
            cmd.Parameters.Add(new SqlParameter("@SetNo", productionDetail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SS", productionDetail.SS));
            cmd.Parameters.Add(new SqlParameter("@Loom", productionDetail.Loom));
            cmd.Parameters.Add(new SqlParameter("@Beam", productionDetail.Beam));
            cmd.Parameters.Add(new SqlParameter("@ProdB", productionDetail.ProdB));
            cmd.Parameters.Add(new SqlParameter("@ProdC", productionDetail.ProdC));
            cmd.Parameters.Add(new SqlParameter("@CutPieece", productionDetail.CutPieece));
            cmd.Parameters.Add(new SqlParameter("@Wastage", productionDetail.Wastage));
            cmd.Parameters.Add(new SqlParameter("@ProdG", productionDetail.ProdG));
            cmd.Parameters.Add(new SqlParameter("@TotalProd", productionDetail.TotalProd));
            cmd.Parameters.Add(new SqlParameter("@FCode", productionDetail.FCode));
            cmd.Parameters.Add(new SqlParameter("@FType", productionDetail.FType));
            cmd.Parameters.Add(new SqlParameter("@UserName", productionDetail.UserName));
            cmd.Parameters.Add(new SqlParameter("@EDate", productionDetail.EDate));
            cmd.Parameters.Add(new SqlParameter("@PType", productionDetail.PType));
            cmd.Parameters.Add(new SqlParameter("@PCode", productionDetail.PCode));
            cmd.Parameters.Add(new SqlParameter("@UCode", productionDetail.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", productionDetail.UName));
            cmd.Parameters.Add(new SqlParameter("@FinishMCName", productionDetail.FinishMCName));
            cmd.Parameters.Add(new SqlParameter("@FinishMCCode", productionDetail.FinishMCCode));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public TblStock22 SaveInspectionOperatorProductionDetail(TblStock22 operatorProductionDetail)
        {
            var res = new TblStock22();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateInspectionOperatorProductionDetail("SP_INSERT_INSPECTION_PRODUCTION_OPERATOR_PRODUCTION_INFO", "SAVE_INSPECTION_OPERATOR_PRODUCTION", operatorProductionDetail);
                res.SaveStatus = Operation.Success.ToString();
                res.DID = Convert.ToInt32(dt.Rows[0]["DID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateInspectionOperatorProductionDetail(string procedure, string callname, TblStock22 operatorProductionDetail)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@DID", operatorProductionDetail.DID));
            cmd.Parameters.Add(new SqlParameter("@ID", operatorProductionDetail.ID));
            cmd.Parameters.Add(new SqlParameter("@OCode", operatorProductionDetail.OCode));
            cmd.Parameters.Add(new SqlParameter("@OName", operatorProductionDetail.OName));
            cmd.Parameters.Add(new SqlParameter("@CapName", operatorProductionDetail.CapName));
            cmd.Parameters.Add(new SqlParameter("@CapCode", operatorProductionDetail.CapCode));
            cmd.Parameters.Add(new SqlParameter("@Desig", operatorProductionDetail.Desig));
            cmd.Parameters.Add(new SqlParameter("@AcProd", operatorProductionDetail.AcProd));
            cmd.Parameters.Add(new SqlParameter("@ReFinish", operatorProductionDetail.ReFinish));
            cmd.Parameters.Add(new SqlParameter("@ReInspection", operatorProductionDetail.ReInspection));
            cmd.Parameters.Add(new SqlParameter("@Sample", operatorProductionDetail.Sample));
            cmd.Parameters.Add(new SqlParameter("@QCCheque", operatorProductionDetail.QCCheque));
            cmd.Parameters.Add(new SqlParameter("@Hold", operatorProductionDetail.Hold));
            cmd.Parameters.Add(new SqlParameter("@CP", operatorProductionDetail.CP));
            cmd.Parameters.Add(new SqlParameter("@CutPeace", operatorProductionDetail.CutPeace));
            cmd.Parameters.Add(new SqlParameter("@GreyMending", operatorProductionDetail.GreyMending));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode", operatorProductionDetail.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@Shift", operatorProductionDetail.Shift));
            cmd.Parameters.Add(new SqlParameter("@STimeHr", operatorProductionDetail.STimeHr));
            cmd.Parameters.Add(new SqlParameter("@Remarks", operatorProductionDetail.Remarks));
            cmd.Parameters.Add(new SqlParameter("@EDate", operatorProductionDetail.EDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

    }
}