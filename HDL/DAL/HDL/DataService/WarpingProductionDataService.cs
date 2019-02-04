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
    public class WarpingProductionDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public List<SetInfoEntity> GetWarpingSetNo()
        {
            return _common.Select_Data_List<SetInfoEntity>("sp_select_warping_production_info", "Get_All_Warping_Set");
        }

        public WarpingPlanInfo GetInfoBySetNo(string setNo)
        {
            return _common.Select_Data_List<WarpingPlanInfo>("sp_select_warping_production_info", "Get_Warping_Plan_Details",setNo).SingleOrDefault();
        }

        public List<ItemInfoEntity> GetItemBySetNo(string setNo)
        {
            return _common.Select_Data_List<ItemInfoEntity>("sp_select_warping_production_info", "Get_All_Warping_Item", setNo);
        }
        public WarpingPlanInfo GetItemBySetNoAndItem(string setNo,string icNo)
        {
            return _common.Select_Data_List<WarpingPlanInfo>("sp_select_warping_production_info", "Get_Item_Info_by_Set_Item", setNo, icNo).SingleOrDefault();
        }

        public List<LotInfo> GetLotNoByIName(string iName)
        {
            return _common.Select_Data_List<LotInfo>("sp_select_warping_production_info", "Get_Lot_Info_by_Item", iName);
        }

        public WarpingProdInfo SaveWarpingProdInfo(WarpingProdInfo objWarp, DataSet dsWarpDetails)
        {
            var res = new WarpingProdInfo();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_WarpingProductionInfo("sp_insert_warping_production_info", "save_warping_production_info", objWarp, dsWarpDetails);
                res.SaveStatus = Operation.Success.ToString();
                res.IdNo = Convert.ToInt32(dt.Rows[0]["IdNo"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }

        public DataTable Insert_Update_WarpingProductionInfo(string procedure, string callname, WarpingProdInfo objWarp, DataSet rqdXmlv1 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add(new SqlParameter("@p_IdNo", objWarp.IdNo));
            cmd.Parameters.Add(new SqlParameter("@p_PWarpDate", objWarp.PWarpDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_WarpLength", objWarp.WarpLength));
            cmd.Parameters.Add(new SqlParameter("@p_Remarks", objWarp.Remarks));
            cmd.Parameters.Add(new SqlParameter("@p_SetNo", objWarp.SetNo));
            cmd.Parameters.Add(new SqlParameter("@p_EndsPerBeam", objWarp.EndsPerBeam));
            cmd.Parameters.Add(new SqlParameter("@p_TotalBeam", objWarp.TotalBeam));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfBeam", objWarp.NoOfBeam));
            cmd.Parameters.Add(new SqlParameter("@p_TotalCreal", objWarp.TotalCreal));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfCreal", objWarp.NoOfCreal));
            cmd.Parameters.Add(new SqlParameter("@p_TotalEnds", objWarp.TotalEnds));
            cmd.Parameters.Add(new SqlParameter("@p_MSpeed", objWarp.MSpeed));
            cmd.Parameters.Add(new SqlParameter("@p_YarnTension", objWarp.YarnTension));
            cmd.Parameters.Add(new SqlParameter("@p_ProcessingForce", objWarp.ProcessingForce));
            cmd.Parameters.Add(new SqlParameter("@p_Code", objWarp.Code));
            cmd.Parameters.Add(new SqlParameter("@p_LengthMtr", objWarp.LengthMtr));
            cmd.Parameters.Add(new SqlParameter("@p_DeptCode", objWarp.DeptCode));
            cmd.Parameters.Add(new SqlParameter("@p_WarpRatio", objWarp.WarpRatio));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnLot", objWarp.ProYarnLot));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnSupp", objWarp.ProYarnSupp));
            cmd.Parameters.Add(new SqlParameter("@p_StyleNo", objWarp.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@p_StyleCode", objWarp.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@p_Construction", objWarp.Construction));
            cmd.Parameters.Add(new SqlParameter("@p_Width", objWarp.Width));
            cmd.Parameters.Add(new SqlParameter("@p_PTCode", objWarp.PTCode));
            cmd.Parameters.Add(new SqlParameter("@p_CustCode", objWarp.CustCode));
            cmd.Parameters.Add(new SqlParameter("@p_MCNo", objWarp.MCNo));
            cmd.Parameters.Add(new SqlParameter("@p_MCCode", objWarp.MCCode));
            cmd.Parameters.Add(new SqlParameter("@p_UCode", objWarp.UCode));
            cmd.Parameters.Add(new SqlParameter("@p_YarnCounts", objWarp.YarnCounts));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objWarp.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objWarp.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public bool CheckIsExistSetNo(int idNo, int setNo)
        {
            bool rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_warping_production_info", "check_Is_Exist_SetNo", idNo.ToString(), setNo.ToString());
            rv = dt.Rows.Count > 0;
            return rv;
        }

        public GridEntity<WarpingProdInfo> GetWarpingProdSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<WarpingProdInfo>.GetGridData_5(options, "sp_select_warping_production_grid", "get_warping_prod_info_summary", "IdNo", dateFrom, dateTo);
        }

        public List<WarpingProdDetails> GetAllGridData(string idNo)
        {
            return _common.Select_Data_List<WarpingProdDetails>("sp_select_warping_production_info", "get_warpingProd_details_grid_data", idNo);
        }
    }
}
