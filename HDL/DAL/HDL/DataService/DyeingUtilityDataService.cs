using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HDL.DataService
{
    public class DyeingUtilityDataService
    {
        //SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        SqlDataAdapter da;
        string connectionString = ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        //Read 
        public List<SetInfoEntity> GetAllDyeingSet()
        {
            var result = _common.Select_Data_List<SetInfoEntity>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_DYEING_SET").ToList();
            return result;
        }
        public List<DyeingProcess> GetDyeingProcessInfo(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcess>("SP_SELECT_DYEING_UTILITY_INFO", "GET_DYEING_PRODUCTION_INFO", setNo).ToList();
            return result;
        }
        public List<DyeingUtilityRunAndStop> GetAllRunAndStop(string setNo)
        {
            var result = _common.Select_Data_List<DyeingUtilityRunAndStop>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_DYEING_UTILITY_RUN_AND_STOP", setNo).ToList();
            return result;
        }
        public List<DyeingUtilityTimeUtilization> GetAllTimeUtilization(string setNo)
        {
            var result = _common.Select_Data_List<DyeingUtilityTimeUtilization>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_TIME_UTILIZATION", setNo).ToList();
            return result;
        }
        public List<DyeingUtilityWastageDetail> GetAllWastageDetail(string setNo)
        {
            var result = _common.Select_Data_List<DyeingUtilityWastageDetail>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_WASTAGE_DETAIL", setNo).ToList();
            return result;
        }
        public List<DyeingUtilityDrainageDetail> GetAllDrainageDetail(string setNo)
        {
            var result = _common.Select_Data_List<DyeingUtilityDrainageDetail>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_DRAINAGE_DETAIL", setNo).ToList();
            return result;
        }
        public List<DyeingProcessCreelUnit> GetAllCreelUnit(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcessCreelUnit>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_CREEL_UNIT", setNo).ToList();
            return result;
        }
        public List<DyeingProcessDyeingParameter> GetAllDyeingParameter(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcessDyeingParameter>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_DYEING_PARAMETER", setNo).ToList();
            return result;
        }
        public List<DyeingProcessSizingParameter> GetAllSizingParameter(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcessSizingParameter>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_SIZING_PARAMETER", setNo).ToList();
            return result;
        }
        public List<DyeingProcessHeadStock> GetAllHeadStock(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcessHeadStock>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_HEAD_STOCK", setNo).ToList();
            return result;
        }
        public List<DyeingProcessCompensator> GetAllCompensator(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcessCompensator>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_COMPENSATOR", setNo).ToList();
            return result;
        }
        public List<DyeingProcessCreelLoading> GetAllCreelLoading(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcessCreelLoading>("SP_SELECT_DYEING_UTILITY_INFO","GET_ALL_CREEL_LOADING", setNo).ToList();
            return result;
        }
        public List<DyeingProcessRecipe> GetAllRecipe(string setNo)
        {
            var result = _common.Select_Data_List<DyeingProcessRecipe>("SP_SELECT_DYEING_UTILITY_INFO", "GET_ALL_RECIPE", setNo).ToList();
            return result;
        }

        //Insert Data
        public DyeingProcess SaveDyeingProcessInfo(DyeingProcess dyeingProcess)
        {
            var res = new DyeingProcess();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateDyeingProcessInfo("SP_INSERT_DYEING_UTILITY_INFO", "SAVE_DYEING_PROCESS_INFO", dyeingProcess);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateDyeingProcessInfo(string procedure, string callname, DyeingProcess dyeingProcess)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_ID", dyeingProcess.ID));
            cmd.Parameters.Add(new SqlParameter("@p_DyeingID", dyeingProcess.DyeingID));
            cmd.Parameters.Add(new SqlParameter("@p_DyeDate", dyeingProcess.DyeDate));
            cmd.Parameters.Add(new SqlParameter("@p_SetNo", dyeingProcess.SetNo));
            cmd.Parameters.Add(new SqlParameter("@p_LengthMtr", dyeingProcess.LengthMtr));
            cmd.Parameters.Add(new SqlParameter("@p_LengthKg", dyeingProcess.LengthKg));
            cmd.Parameters.Add(new SqlParameter("@p_SortNo", dyeingProcess.SortNo));
            cmd.Parameters.Add(new SqlParameter("@p_Colour", dyeingProcess.Colour));
            cmd.Parameters.Add(new SqlParameter("@p_DyeColour", dyeingProcess.DyeColour));
            cmd.Parameters.Add(new SqlParameter("@p_YarnCode", dyeingProcess.YarnCode));
            cmd.Parameters.Add(new SqlParameter("@p_WarpRatio", dyeingProcess.WarpRatio));
            cmd.Parameters.Add(new SqlParameter("@p_EndsPerBeam", dyeingProcess.EndsPerBeam));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfBeam", dyeingProcess.NoOfBeam));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfCreel", dyeingProcess.NoOfCreel));
            cmd.Parameters.Add(new SqlParameter("@p_TotalEnd", dyeingProcess.TotalEnd));
            cmd.Parameters.Add(new SqlParameter("@p_MCSpeed", dyeingProcess.MCSpeed));
            cmd.Parameters.Add(new SqlParameter("@p_DyeMCSpeed", dyeingProcess.DyeMCSpeed));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnLot", dyeingProcess.ProYarnLot));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnSupplier", dyeingProcess.ProYarnSupplier));
            cmd.Parameters.Add(new SqlParameter("@p_AvgCount", dyeingProcess.AvgCount));
            cmd.Parameters.Add(new SqlParameter("@p_MCStartTime", dyeingProcess.MCStartTime));
            cmd.Parameters.Add(new SqlParameter("@p_MCStopTime", dyeingProcess.MCStopTime));
            cmd.Parameters.Add(new SqlParameter("@p_MCRunTimeHour", dyeingProcess.MCRunTimeHour));
            cmd.Parameters.Add(new SqlParameter("@p_MCRunTimeMinute", dyeingProcess.MCRunTimeMinute));
            cmd.Parameters.Add(new SqlParameter("@p_ShadeIndigoPercent", dyeingProcess.ShadeIndigoPercent));
            cmd.Parameters.Add(new SqlParameter("@p_ShadeBlackPercent", dyeingProcess.ShadeBlackPercent));
            cmd.Parameters.Add(new SqlParameter("@p_ShadeMatchWith", dyeingProcess.ShadeMatchWith));
            cmd.Parameters.Add(new SqlParameter("@p_Bath", dyeingProcess.Bath));
            cmd.Parameters.Add(new SqlParameter("@p_Feeding", dyeingProcess.Feeding));
            cmd.Parameters.Add(new SqlParameter("@p_Refraction", dyeingProcess.Refraction));
            cmd.Parameters.Add(new SqlParameter("@p_Viscosity", dyeingProcess.Viscosity));
            cmd.Parameters.Add(new SqlParameter("@p_Buyer", dyeingProcess.Buyer));
            cmd.Parameters.Add(new SqlParameter("@p_StyleNo", dyeingProcess.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@p_StyleCode", dyeingProcess.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@p_GreyConstruction", dyeingProcess.GreyConstruction));
            cmd.Parameters.Add(new SqlParameter("@p_FabricConstruction", dyeingProcess.FabricConstruction));
            cmd.Parameters.Add(new SqlParameter("@p_Weight", dyeingProcess.Weight));
            cmd.Parameters.Add(new SqlParameter("@p_Weave", dyeingProcess.Weave));
            cmd.Parameters.Add(new SqlParameter("@p_Width", dyeingProcess.Width));
            cmd.Parameters.Add(new SqlParameter("@p_AfterLengthMeter", dyeingProcess.AfterLengthMeter));
            cmd.Parameters.Add(new SqlParameter("@p_AfterLengthKg", dyeingProcess.AfterLengthKg));
            cmd.Parameters.Add(new SqlParameter("@p_ColorRequired", dyeingProcess.ColorRequired));
            cmd.Parameters.Add(new SqlParameter("@p_PH", dyeingProcess.PH));
            cmd.Parameters.Add(new SqlParameter("@p_Redox", dyeingProcess.Redox));
            cmd.Parameters.Add(new SqlParameter("@p_ColorCode", dyeingProcess.ColorCode));
            cmd.Parameters.Add(new SqlParameter("@p_IndigoRedox", dyeingProcess.IndigoRedox));
            cmd.Parameters.Add(new SqlParameter("@p_IndigoPH", dyeingProcess.IndigoPH));
            cmd.Parameters.Add(new SqlParameter("@p_IndigoDosing", dyeingProcess.IndigoDosing));
            cmd.Parameters.Add(new SqlParameter("@p_SulpherRedox", dyeingProcess.SulpherRedox));
            cmd.Parameters.Add(new SqlParameter("@p_SulpherPH", dyeingProcess.SulpherPH));
            cmd.Parameters.Add(new SqlParameter("@p_SulpherDosing", dyeingProcess.SulpherDosing));
            cmd.Parameters.Add(new SqlParameter("@p_SulpherTemperature", dyeingProcess.SulpherTemperature));
            cmd.Parameters.Add(new SqlParameter("@p_HydroDosing", dyeingProcess.HydroDosing));
            cmd.Parameters.Add(new SqlParameter("@p_CusticDosing", dyeingProcess.CusticDosing));
            cmd.Parameters.Add(new SqlParameter("@p_CusticConcentration", dyeingProcess.CusticConcentration));
            cmd.Parameters.Add(new SqlParameter("@p_UserName", dyeingProcess.UserName));
            cmd.Parameters.Add(new SqlParameter("@p_EntryDate", DateTime.Now));
            cmd.Parameters.Add(new SqlParameter("@p_Remark", dyeingProcess.Remark));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingUtilityRunAndStop SaveRunAndStop(DyeingUtilityRunAndStop runAndStop)
        {
            var res = new DyeingUtilityRunAndStop();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateDyeingStopAndRun("SP_INSERT_DYEING_UTILITY_RUN_AND_STOP", "SAVE_RUN_AND_STOP", runAndStop);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateDyeingStopAndRun(string procedure, string callname, DyeingUtilityRunAndStop runAndStop)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", runAndStop.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", runAndStop.SetNo));
            cmd.Parameters.Add(new SqlParameter("@DepartmentID", runAndStop.DepartmentID));
            cmd.Parameters.Add(new SqlParameter("@DepartmentName", runAndStop.DepartmentName));
            cmd.Parameters.Add(new SqlParameter("@SlowFromTime", runAndStop.SlowFromTime));
            cmd.Parameters.Add(new SqlParameter("@SlowToTime", runAndStop.SlowToTime));
            cmd.Parameters.Add(new SqlParameter("@StopFromTime", runAndStop.StopFromTime));
            cmd.Parameters.Add(new SqlParameter("@StopToTime", runAndStop.StopToTime));
            cmd.Parameters.Add(new SqlParameter("@Duration", runAndStop.Duration));
            cmd.Parameters.Add(new SqlParameter("@ReasonID", runAndStop.ReasonID));
            cmd.Parameters.Add(new SqlParameter("@ReasonName", runAndStop.ReasonName));
            cmd.Parameters.Add(new SqlParameter("@ReasonType", runAndStop.ReasonType));
            cmd.Parameters.Add(new SqlParameter("@ProductionLossMeter", runAndStop.ProductionLossMeter));
            cmd.Parameters.Add(new SqlParameter("@CGradeYarnMeter", runAndStop.CGradeYarnMeter));
            cmd.Parameters.Add(new SqlParameter("@UserID", runAndStop.UserID));
            cmd.Parameters.Add(new SqlParameter("@TermID", runAndStop.TermID));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", runAndStop.EntryDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingUtilityTimeUtilization SaveTimeUtilization(DyeingUtilityTimeUtilization timeUtilization)
        {
            var res = new DyeingUtilityTimeUtilization();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateTimeUtilization("SP_INSERT_DYEING_UTILITY_TIME_UTILIZATION", "SAVE_TIME_UTILIZATION", timeUtilization);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateTimeUtilization(string procedure, string callname, DyeingUtilityTimeUtilization timeUtilization)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", timeUtilization.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", timeUtilization.SetNo));
            cmd.Parameters.Add(new SqlParameter("@TimeUtilizationID", timeUtilization.TimeUtilizationID));
            cmd.Parameters.Add(new SqlParameter("@TimeUtilizationName", timeUtilization.TimeUtilizationName));
            cmd.Parameters.Add(new SqlParameter("@MCRunFrom", timeUtilization.MCRunFrom));
            cmd.Parameters.Add(new SqlParameter("@MCRunTo", timeUtilization.MCRunTo));
            cmd.Parameters.Add(new SqlParameter("@TotalTimeHour", timeUtilization.TotalTimeHour));
            cmd.Parameters.Add(new SqlParameter("@CalculatedRunHour", timeUtilization.CalculatedRunHour));
            cmd.Parameters.Add(new SqlParameter("@Remark", timeUtilization.Remark));
            cmd.Parameters.Add(new SqlParameter("@UserID", timeUtilization.UserID));
            cmd.Parameters.Add(new SqlParameter("@TermID", timeUtilization.TermID));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", timeUtilization.EntryDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingUtilityWastageDetail SaveWastageDetail(DyeingUtilityWastageDetail wastageDetail)
        {
            var res = new DyeingUtilityWastageDetail();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateWastageDetail("SP_INSERT_DYEING_UTILITY_WASTAGE_DETAIL", "SAVE_WASTAGE_DETAIL", wastageDetail);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateWastageDetail(string procedure, string callname, DyeingUtilityWastageDetail wastageDetail)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", wastageDetail.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", wastageDetail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@WastageTypeID", wastageDetail.WastageTypeID));
            cmd.Parameters.Add(new SqlParameter("@WastageTypeName", wastageDetail.WastageTypeName));
            cmd.Parameters.Add(new SqlParameter("@QuantityKg", wastageDetail.QuantityKg));
            cmd.Parameters.Add(new SqlParameter("@Remark", wastageDetail.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", wastageDetail.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", wastageDetail.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", wastageDetail.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", wastageDetail.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingUtilityDrainageDetail SaveDrainageDetail(DyeingUtilityDrainageDetail drainageDetail)
        {
            var res = new DyeingUtilityDrainageDetail();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateDrainageDetail("SP_INSERT_DYEING_UTILITY_DRAINAGE_DETAIL", "SAVE_DRAINAGE_DETAIL", drainageDetail);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateDrainageDetail(string procedure, string callname, DyeingUtilityDrainageDetail drainageDetail)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", drainageDetail.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", drainageDetail.SetNo));
            cmd.Parameters.Add(new SqlParameter("@ItemID", drainageDetail.ItemID));
            cmd.Parameters.Add(new SqlParameter("@ItemName", drainageDetail.ItemName));
            cmd.Parameters.Add(new SqlParameter("@QuantityLiter", drainageDetail.QuantityLiter));
            cmd.Parameters.Add(new SqlParameter("@Concentration", drainageDetail.Concentration));
            cmd.Parameters.Add(new SqlParameter("@QuantityKg", drainageDetail.QuantityKg));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode", drainageDetail.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@ShiftName", drainageDetail.ShiftName));
            cmd.Parameters.Add(new SqlParameter("@PO", drainageDetail.PO));
            cmd.Parameters.Add(new SqlParameter("@CardNo", drainageDetail.CardNo));
            cmd.Parameters.Add(new SqlParameter("@Cost", drainageDetail.Cost));
            cmd.Parameters.Add(new SqlParameter("@Rate", drainageDetail.Rate));
            cmd.Parameters.Add(new SqlParameter("@ReasonID", drainageDetail.ReasonID));
            cmd.Parameters.Add(new SqlParameter("@ReasonName", drainageDetail.ReasonName));
            cmd.Parameters.Add(new SqlParameter("@Remark", drainageDetail.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", drainageDetail.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", drainageDetail.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", drainageDetail.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", drainageDetail.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingProcessCreelUnit SaveCreelUnit(DyeingProcessCreelUnit creelUnit)
        {
            var res = new DyeingProcessCreelUnit();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateCreelUnit("SP_INSERT_DYEING_PROCESS_CREEL_UNIT", "SAVE_CREEL_UNIT", creelUnit);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateCreelUnit(string procedure, string callname, DyeingProcessCreelUnit creelUnit)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", creelUnit.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", creelUnit.SetNo));
            cmd.Parameters.Add(new SqlParameter("@LoadCellTension", creelUnit.LoadCellTension));
            cmd.Parameters.Add(new SqlParameter("@TakeOfForce", creelUnit.TakeOfForce));
            cmd.Parameters.Add(new SqlParameter("@Remark", creelUnit.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", creelUnit.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", creelUnit.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", creelUnit.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", creelUnit.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingProcessDyeingParameter SaveDyeingParameter(DyeingProcessDyeingParameter dyeingParameter)
        {
            var res = new DyeingProcessDyeingParameter();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateDyeingParameter("SP_INSERT_DYEING_PROCESS_DYEING_PARAMETER", "SAVE_DYEING_PARAMETER", dyeingParameter);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateDyeingParameter(string procedure, string callname, DyeingProcessDyeingParameter dyeingParameter)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", dyeingParameter.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", dyeingParameter.SetNo));
            cmd.Parameters.Add(new SqlParameter("@BathNo", dyeingParameter.BathNo));
            cmd.Parameters.Add(new SqlParameter("@BathInProcess", dyeingParameter.BathInProcess));
            cmd.Parameters.Add(new SqlParameter("@Temperature", dyeingParameter.Temperature));
            cmd.Parameters.Add(new SqlParameter("@SqueezePressure", dyeingParameter.SqueezePressure));
            cmd.Parameters.Add(new SqlParameter("@Tension", dyeingParameter.Tension));
            cmd.Parameters.Add(new SqlParameter("@WaterFlow", dyeingParameter.WaterFlow));
            cmd.Parameters.Add(new SqlParameter("@Remark", dyeingParameter.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", dyeingParameter.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", dyeingParameter.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", dyeingParameter.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", dyeingParameter.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingProcessSizingParameter SaveSizingParameter(DyeingProcessSizingParameter sizingParameter)
        {
            var res = new DyeingProcessSizingParameter();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateSizingParameter("SP_INSERT_DYEING_PROCESS_SIZING_PARAMETER", "SAVE_SIZING_PARAMETER", sizingParameter);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateSizingParameter(string procedure, string callname, DyeingProcessSizingParameter sizingParameter)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", sizingParameter.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", sizingParameter.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SowBoxTemperature", sizingParameter.SowBoxTemperature));
            cmd.Parameters.Add(new SqlParameter("@CookingTemperature", sizingParameter.CookingTemperature));
            cmd.Parameters.Add(new SqlParameter("@SqueezePressure1", sizingParameter.SqueezePressure1));
            cmd.Parameters.Add(new SqlParameter("@SqueezePressure2", sizingParameter.SqueezePressure2));
            cmd.Parameters.Add(new SqlParameter("@Remark", sizingParameter.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", sizingParameter.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", sizingParameter.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", sizingParameter.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", sizingParameter.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingProcessHeadStock SaveHeadStock(DyeingProcessHeadStock headStock)
        {
            var res = new DyeingProcessHeadStock();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateHeadStock("SP_INSERT_DYEING_PROCESS_HEAD_STOCK", "SAVE_HEAD_STOCK", headStock);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateHeadStock(string procedure, string callname, DyeingProcessHeadStock headStock)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", headStock.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", headStock.SetNo));
            cmd.Parameters.Add(new SqlParameter("@DividingTableTension", headStock.DividingTableTension));
            cmd.Parameters.Add(new SqlParameter("@WindingTension", headStock.WindingTension));
            cmd.Parameters.Add(new SqlParameter("@PressingTension", headStock.PressingTension));
            cmd.Parameters.Add(new SqlParameter("@Moisture", headStock.Moisture));
            cmd.Parameters.Add(new SqlParameter("@Remark", headStock.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", headStock.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", headStock.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", headStock.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", headStock.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingProcessCompensator SaveCompensator(DyeingProcessCompensator compensator)
        {
            var res = new DyeingProcessCompensator();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateCompensator("SP_INSERT_DYEING_PROCESS_COMPENSATOR", "SAVE_COMPENSATOR", compensator);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateCompensator(string procedure, string callname, DyeingProcessCompensator compensator)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", compensator.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", compensator.SetNo));
            cmd.Parameters.Add(new SqlParameter("@HydrolicPressure", compensator.HydrolicPressure));
            cmd.Parameters.Add(new SqlParameter("@Tension", compensator.Tension));
            cmd.Parameters.Add(new SqlParameter("@Remark", compensator.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", compensator.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", compensator.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", compensator.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", compensator.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingProcessCreelLoading SaveCreelLoading(DyeingProcessCreelLoading creelLoading)
        {
            var res = new DyeingProcessCreelLoading();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateCreelLoading("SP_INSERT_DYEING_PROCESS_CREEL_LOADING", "SAVE_CREEL_LOADING", creelLoading);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateCreelLoading(string procedure, string callname, DyeingProcessCreelLoading creelLoading)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", creelLoading.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", creelLoading.SetNo));
            cmd.Parameters.Add(new SqlParameter("@UpperCreel", creelLoading.UpperCreel));
            cmd.Parameters.Add(new SqlParameter("@UpperCreelBeamNo", creelLoading.UpperCreelBeamNo));
            cmd.Parameters.Add(new SqlParameter("@UpperCreelYarnCount", creelLoading.UpperCreelYarnCount));
            cmd.Parameters.Add(new SqlParameter("@LowerCreel", creelLoading.LowerCreel));
            cmd.Parameters.Add(new SqlParameter("@LowerCreelBeamNo", creelLoading.LowerCreelBeamNo));
            cmd.Parameters.Add(new SqlParameter("@LowerCreelYarnCount", creelLoading.LowerCreelYarnCount));
            cmd.Parameters.Add(new SqlParameter("@Remark", creelLoading.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", creelLoading.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", creelLoading.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", creelLoading.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", creelLoading.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public DyeingProcessRecipe SaveRecipe(DyeingProcessRecipe recipe)
        {
            var res = new DyeingProcessRecipe();
            var dt = new DataTable();
            try
            {
                dt = InserOrUpdateRecipe("SP_INSERT_DYEING_PROCESS_RECIPE", "SAVE_RECIPE", recipe);
                res.SaveStatus = Operation.Success.ToString();
                res.ID = Convert.ToInt32(dt.Rows[0]["ID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InserOrUpdateRecipe(string procedure, string callname, DyeingProcessRecipe recipe)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", recipe.ID));
            cmd.Parameters.Add(new SqlParameter("@SetNo", recipe.SetNo));
            cmd.Parameters.Add(new SqlParameter("@RecipeType", recipe.RecipeType));
            cmd.Parameters.Add(new SqlParameter("@QuantityGpl", recipe.QuantityGpl));
            cmd.Parameters.Add(new SqlParameter("@ItemCode", recipe.ItemCode));
            cmd.Parameters.Add(new SqlParameter("@ItemName", recipe.ItemName));
            cmd.Parameters.Add(new SqlParameter("@Remark", recipe.Remark));
            cmd.Parameters.Add(new SqlParameter("@EntryBy", recipe.EntryBy));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", recipe.EntryDate));
            cmd.Parameters.Add(new SqlParameter("@UpdateBy", recipe.UpdateBy));
            cmd.Parameters.Add(new SqlParameter("@UpdateDate", recipe.UpdateDate));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}