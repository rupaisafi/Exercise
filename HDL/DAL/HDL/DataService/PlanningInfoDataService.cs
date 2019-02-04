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
using Entities.HDL.DTO;

namespace DAL.HDL.DataService
{
    public class PlanningInfoDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        SqlTransaction transaction;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public GridEntity<PlanningInfoSummaryEntity> GetPlanningInfoSummary(GridOptions options, string planDateFrom, string planDateTo)
        {
            return KendoGrid<PlanningInfoSummaryEntity>.GetGridData_5(options, "sp_select_planning_info_grid", "get_planning_info_summary", "PID", planDateFrom, planDateTo);  
        }

        public PlanningInformation SavePlanningInfo(PlanningInformation objPlan, PlanningInfoDetails objPlanDetails, PlanningInfoDetailsWp objWarp, PlanningInfoDetailsDye objDyeing, PlanningInfoDetailsWv objWeav, DataSet dsWarping, DataSet dsDyeing, DataSet dsWeaving)
        {
            string rv = "";
            var objplan2 = new PlanningInformation();

            try
            {
                dbConn = new SqlConnection(ConnectionString);
                dbConn.Open();
                transaction=dbConn.BeginTransaction();
               // cmd.Transaction = transaction;

                var dt = new DataTable();
                dt = Insert_Update_Planning_Info("sp_insert_planning_info", "save_planning_info", objPlan);
                var pid = Convert.ToInt32(dt.Rows[0]["PID"].ToString());
                objPlanDetails.PID = pid;
                objWarp.PID = pid;
                objDyeing.PID = pid;
                objWeav.PID = pid;

                Insert_Update_Planning_DetailsInfo("sp_insert_planning_details_info", "save_planning_details_info",
                    objPlanDetails);
                Insert_Update_Warping_Info("sp_insert_planning_details_info_warping", "save_warping_info", objWarp,
                    dsWarping);
                Insert_Update_Dyeing_Info("sp_insert_planning_details_info_dyeing", "save_dyeing_info", objDyeing,
                    dsDyeing);
                Insert_Update_Weaving_Info("sp_insert_planning_details_info_weaving", "save_weaving_info", objWeav,
                    dsWeaving);

                objplan2.PID = Convert.ToInt32(dt.Rows[0]["PID"].ToString());
                objplan2.SaveStatus = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                objplan2.SaveStatus = ex.Message;
                transaction.Rollback();
            }
            finally
            {
                transaction.Commit();
                dbConn.Close();
            }
            return objplan2;
        }
        public DataTable Insert_Update_Planning_Info(string procedure, string callname, PlanningInformation objPlan)
        {
            //dbConn = new SqlConnection(ConnectionString);
            //dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn, transaction);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_PID", objPlan.PID));
            cmd.Parameters.Add(new SqlParameter("@p_PDate", objPlan.PDate));
            cmd.Parameters.Add(new SqlParameter("@p_UnitCode", objPlan.UnitCode));
            cmd.Parameters.Add(new SqlParameter("@p_SetNo", objPlan.SetNo));
            cmd.Parameters.Add(new SqlParameter("@p_SetLength", objPlan.SetLength));
            cmd.Parameters.Add(new SqlParameter("@p_CustCode", objPlan.CustCode));
            cmd.Parameters.Add(new SqlParameter("@p_MerkUserId", objPlan.MerkUserId));
            cmd.Parameters.Add(new SqlParameter("@p_OQnty", objPlan.OQnty));
            cmd.Parameters.Add(new SqlParameter("@p_Rate", objPlan.Rate));
            cmd.Parameters.Add(new SqlParameter("@p_Value", objPlan.Value));
            cmd.Parameters.Add(new SqlParameter("@p_PIWidth", objPlan.PIWidth));
            cmd.Parameters.Add(new SqlParameter("@p_PIShrink", objPlan.PIShrink));
            cmd.Parameters.Add(new SqlParameter("@p_SetPlaned", objPlan.SetPlaned));
            cmd.Parameters.Add(new SqlParameter("@p_TotalTgtLngth", objPlan.TotalTargetLength));
            cmd.Parameters.Add(new SqlParameter("@p_TakenProd", objPlan.TakenProd));
            cmd.Parameters.Add(new SqlParameter("@p_RemainingProd", objPlan.RemainingProd));
            cmd.Parameters.Add(new SqlParameter("@p_Remarks", objPlan.Remarks));
            cmd.Parameters.Add(new SqlParameter("@p_ProdTypeId", objPlan.ProdTypeId));
            cmd.Parameters.Add(new SqlParameter("@p_OrderTypeId", objPlan.OrderTypeId));
            cmd.Parameters.Add(new SqlParameter("@p_OrderStatus", objPlan.OrderStatus));
            cmd.Parameters.Add(new SqlParameter("@p_BuyerId", objPlan.BuyerId));
            cmd.Parameters.Add(new SqlParameter("@p_DeliDate", objPlan.DeliDate));
            cmd.Parameters.Add(new SqlParameter("@p_OrderRef", objPlan.OrderRef));
            cmd.Parameters.Add(new SqlParameter("@p_StyleNo", objPlan.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@p_StyleCode", objPlan.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@p_WpLength", objPlan.WpLength));
            cmd.Parameters.Add(new SqlParameter("@p_DyLength", objPlan.DyLength));
            cmd.Parameters.Add(new SqlParameter("@p_WvLength", objPlan.WvLength));
            cmd.Parameters.Add(new SqlParameter("@p_FiLength", objPlan.FiLength));
            cmd.Parameters.Add(new SqlParameter("@p_InsLength", objPlan.InsLength));
            cmd.Parameters.Add(new SqlParameter("@p_Rej", objPlan.Rej));
            cmd.Parameters.Add(new SqlParameter("@p_DyeProd", objPlan.DyeProd));
            cmd.Parameters.Add(new SqlParameter("@p_EndBuyer", objPlan.EndBuyer));
            cmd.Parameters.Add(new SqlParameter("@p_CSV", objPlan.CSV));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objPlan.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objPlan.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
           // dbConn.Close();
            return dt;
        }
        private void Insert_Update_Planning_DetailsInfo(string procedure, string callname, PlanningInfoDetails plantDetails)
        {
            //dbConn = new SqlConnection(ConnectionString);
            //dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn, transaction);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_PID", plantDetails.PID));
            cmd.Parameters.Add(new SqlParameter("@p_StyleCode", plantDetails.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@p_StyleNo", plantDetails.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@p_Weight", plantDetails.Weight));
            cmd.Parameters.Add(new SqlParameter("@p_TypeId", plantDetails.TypeId));
            cmd.Parameters.Add(new SqlParameter("@p_Construction", plantDetails.Construction));
            cmd.Parameters.Add(new SqlParameter("@p_FConstruction", plantDetails.FConstruction));
            cmd.Parameters.Add(new SqlParameter("@p_Weave", plantDetails.Weave));
          //  cmd.Parameters.Add(new SqlParameter("@p_Width1", plantDetails.Width1));
            cmd.Parameters.Add(new SqlParameter("@p_ColourId", plantDetails.ColourId));
            cmd.Parameters.Add(new SqlParameter("@p_FabricDesc", plantDetails.FabricDesc));
            cmd.Parameters.Add(new SqlParameter("@p_TCode", plantDetails.TCode));
            cmd.Parameters.Add(new SqlParameter("@p_FEPIxPPI", plantDetails.FEPIxPPI));
            cmd.Parameters.Add(new SqlParameter("@p_FinishingRoute", plantDetails.FinishingRoute));
            cmd.Parameters.Add(new SqlParameter("@p_WarpRatio", plantDetails.WarpRatio));
            cmd.Parameters.Add(new SqlParameter("@p_WeftRatio", plantDetails.WeftRatio));
            cmd.Parameters.Add(new SqlParameter("@p_TEnds", plantDetails.TEnds));
            cmd.Parameters.Add(new SqlParameter("@p_ShadeIndigo", plantDetails.ShadeIndigo));
            cmd.Parameters.Add(new SqlParameter("@p_ShadeBlack", plantDetails.ShadeBlack));
            cmd.Parameters.Add(new SqlParameter("@p_YarnCode", plantDetails.YarnCode));
            cmd.Parameters.Add(new SqlParameter("@p_SetStd", plantDetails.SetStd));
            cmd.Parameters.Add(new SqlParameter("@p_WashStd", plantDetails.WashStd));
            cmd.Parameters.Add(new SqlParameter("@p_Appearnce", plantDetails.Appearnce));
            cmd.Parameters.Add(new SqlParameter("@p_WarpShrinkage", plantDetails.WarpShrinkage));
            cmd.Parameters.Add(new SqlParameter("@p_WeftShrinkage", plantDetails.WeftShrinkage));
            cmd.Parameters.Add(new SqlParameter("@p_WeightFinish", plantDetails.WeightFinish));
            cmd.Parameters.Add(new SqlParameter("@p_WeightWash", plantDetails.WeightWash));
            cmd.Parameters.Add(new SqlParameter("@p_StretchAbblity", plantDetails.StretchAbblity));
            cmd.Parameters.Add(new SqlParameter("@p_Skew", plantDetails.Skew));
            cmd.Parameters.Add(new SqlParameter("@p_Movement", plantDetails.Movement));
            cmd.Parameters.Add(new SqlParameter("@p_FinishWidth", plantDetails.FinishWidth));
            cmd.Parameters.Add(new SqlParameter("@p_FinishLength", plantDetails.FinishLength));
            cmd.Parameters.Add(new SqlParameter("@p_GreyWidth", plantDetails.GreyWidth));
            cmd.Parameters.Add(new SqlParameter("@p_GreyWeight", plantDetails.GreyWeight));
            cmd.Parameters.Add(new SqlParameter("@p_GreyEPI", plantDetails.GreyEPI));
            cmd.Parameters.Add(new SqlParameter("@p_GreyPPI", plantDetails.GreyPPI));
            cmd.Parameters.Add(new SqlParameter("@p_ReedSpace", plantDetails.ReedSpace));
            cmd.Parameters.Add(new SqlParameter("@p_ReedCount", plantDetails.ReedCount));
            cmd.Parameters.Add(new SqlParameter("@p_EndDent", plantDetails.EndDent));
            cmd.Parameters.Add(new SqlParameter("@p_Remarks", plantDetails.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
          //  dbConn.Close();
        }

      
        public void Insert_Update_Warping_Info(string procedure, string callname, PlanningInfoDetailsWp objWarp, DataSet rqdXmlv1 = null)
        {
            //dbConn = new SqlConnection(ConnectionString);
            //dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn, transaction);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());//warping Info
            cmd.Parameters.Add(new SqlParameter("@p_PID", objWarp.PID));
            cmd.Parameters.Add(new SqlParameter("@p_EndsPerBeam", objWarp.EndsPerBeam));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfBeam", objWarp.NoOfBeam));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfCreal", objWarp.NoOfCreal));
            cmd.Parameters.Add(new SqlParameter("@p_TotalEnds", objWarp.TotalEnds));
            cmd.Parameters.Add(new SqlParameter("@p_MSpeed", objWarp.MSpeed));
            cmd.Parameters.Add(new SqlParameter("@p_YarnTension", objWarp.YarnTension));
            cmd.Parameters.Add(new SqlParameter("@p_ProcessingForce", objWarp.ProcessingForce));
            cmd.Parameters.Add(new SqlParameter("@p_YarnCounts", objWarp.YarnCounts));
            cmd.Parameters.Add(new SqlParameter("@p_WarpRatio", objWarp.WarpRatio));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnLot", objWarp.ProYarnLot));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnSupp", objWarp.ProYarnSupp));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
          //  dbConn.Close();
           
        }
        private void Insert_Update_Dyeing_Info(string procedure, string callname, PlanningInfoDetailsDye objDyeing, DataSet rqdXmlv1 = null)
        {
            //dbConn = new SqlConnection(ConnectionString);
            //dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn, transaction);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());//dyeing Info
            cmd.Parameters.Add(new SqlParameter("@p_PID", objDyeing.PID));
            cmd.Parameters.Add(new SqlParameter("@p_LengthMtr", objDyeing.LengthMtr));
            cmd.Parameters.Add(new SqlParameter("@p_ColorId", objDyeing.ColorId));
            cmd.Parameters.Add(new SqlParameter("@p_BeamSpace", objDyeing.BeamSpace));
            cmd.Parameters.Add(new SqlParameter("@p_BeamLength", objDyeing.BeamLength));
            cmd.Parameters.Add(new SqlParameter("@p_RefStd", objDyeing.RefStd));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
           // dbConn.Close();
           
        }
        private void Insert_Update_Weaving_Info(string procedure, string callname, PlanningInfoDetailsWv objWeaving, DataSet rqdXmlv1 = null)
        {
            //dbConn = new SqlConnection(ConnectionString);
            //dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn, transaction);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());//dyeing Info
            cmd.Parameters.Add(new SqlParameter("@p_PID", objWeaving.PID));
            cmd.Parameters.Add(new SqlParameter("@p_YarnCounts", objWeaving.YarnCounts));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnLot", objWeaving.ProYarnLot));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnSupp", objWeaving.ProYarnSupp));
            cmd.Parameters.Add(new SqlParameter("@p_WeaveRatio", objWeaving.WeaveRatio));
            cmd.Parameters.Add(new SqlParameter("@p_GreyWidth", objWeaving.GreyWidth));
            cmd.Parameters.Add(new SqlParameter("@p_GreyLength", objWeaving.GreyLength));
            cmd.Parameters.Add(new SqlParameter("@p_Selvedge", objWeaving.Selvedge));
            cmd.Parameters.Add(new SqlParameter("@p_GreyPPI", objWeaving.GreyPPI));
            cmd.Parameters.Add(new SqlParameter("@p_Weigth", objWeaving.Weigth));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
          //  dbConn.Close();

        }

        public DataSet GetAllGridData(string planId)
        {
            var ds = new DataSet();
            ds = _common.select_data_10("", "sp_select_planning_info", "get_all_planning_griddata", planId);
            return ds;
        }

        public bool CheckIsExist(int planId, string setNo)
        {
            bool rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_planning_info", "check_Is_Exist", planId.ToString(), setNo);
            rv = dt.Rows.Count > 0;
            return rv;
        }

        public List<Unit> GetAllUnit()
        {
            return _common.Select_Data_List<Unit>("sp_select_planning_info", "get_all_unit");
        }

        public List<SetInfoEntity> GetSetNoByUnit(int unitCode)
        {
            return _common.Select_Data_List<SetInfoEntity>("sp_select_planning_info", "get_setNo_by_unit", unitCode.ToString());
        }

        public Order GetOrderInfoByOrderNo(string orderNo)
        {
            return _common.Select_Data_List<Order>("sp_select_planning_info", "get_order_info_by_orderNo", orderNo).SingleOrDefault();
        }

        public List<Style> GetStyleInfoByOrderNo(string orderNo)
        {
            return _common.Select_Data_List<Style>("sp_select_planning_info", "get_style_info_by_orderNo", orderNo);
        }

        public OrderStyleInfo GetOrderInfoByByOrderNoAndStyle(string orderNo, string styleCode)
        {
            return _common.Select_Data_List<OrderStyleInfo>("sp_select_planning_info", "get_order_info_by_orderNo_stylecode", orderNo, styleCode).SingleOrDefault();
        }

        public List<LotInfo> GetLotNoByIName(string iName)
        {

            return _common.Select_Data_List<LotInfo>("sp_select_planning_info", "get_lot_no_by_IName", iName);

        }
        public LotInfo GetLotInfoByINameAndLotNo(string iName, string lotNo)
        {
            return _common.Select_Data_List<LotInfo>("sp_select_planning_info", "get_lot_Info_by_IName_Lot_No", iName, lotNo).SingleOrDefault();
        }
    }
}
