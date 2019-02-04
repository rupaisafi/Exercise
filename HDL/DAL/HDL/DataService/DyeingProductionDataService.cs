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
    public class DyeingProductionDataService
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
        
        public DyeingPlanInfo GetInfoBySetNo(string setNo)
        {
            return _common.Select_Data_List<DyeingPlanInfo>("sp_select_dyeing_production_info", "Get_Dyeing_Plan_Details", setNo).SingleOrDefault();
        }

        public Style GetInfoByStyleCode(string styleCode)
        {
            return _common.Select_Data_List<Style>("sp_select_dyeing_production_info", "get_style_by_styleCode", styleCode).SingleOrDefault();
        }

        public List<ItemInfoEntity> GetItemBySetNo(string setNo)
        {
            return _common.Select_Data_List<ItemInfoEntity>("sp_select_warping_production_info", "Get_All_Warping_Item", setNo);
        }

        public WarpingPlanInfo GetItemBySetNoAndItem(string setNo, string icNo)
        {
            return _common.Select_Data_List<WarpingPlanInfo>("sp_select_warping_production_info", "Get_Item_Info_by_Set_Item", setNo, icNo).SingleOrDefault();
        }

        public List<LotInfo> GetLotNoByIName(string iName)
        {
            return _common.Select_Data_List<LotInfo>("sp_select_warping_production_info", "Get_Lot_Info_by_Item", iName);
        }

        public DyeingProdInfo SaveDyeingProdInfo(DyeingProdInfo prodInfo, DataSet dsDyeDetails)
        {
            var res = new DyeingProdInfo();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_DyeingProductionInfo("sp_insert_dyeing_production_info", "save_dyeing_production_info", prodInfo, dsDyeDetails);
                res.SaveStatus = Operation.Success.ToString();
                res.DID = Convert.ToInt32(dt.Rows[0]["DID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }

        public DataTable Insert_Update_DyeingProductionInfo(string procedure, string callname, DyeingProdInfo prodInfo, DataSet rqdXmlv1 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = rqdXmlv1 == null ? null : rqdXmlv1.GetXml();
            cmd.Parameters.Add(new SqlParameter("@p_DID", prodInfo.DID));
            cmd.Parameters.Add(new SqlParameter("@p_DyeDate", prodInfo.DyeDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_SetNo", prodInfo.SetNo));
            cmd.Parameters.Add(new SqlParameter("@p_LengthMtr", prodInfo.LengthMtr));
            cmd.Parameters.Add(new SqlParameter("@p_LengthKg", prodInfo.LengthKg));
            cmd.Parameters.Add(new SqlParameter("@p_Colour", prodInfo.Colour));
            cmd.Parameters.Add(new SqlParameter("@p_YCode", prodInfo.YCode));
            cmd.Parameters.Add(new SqlParameter("@p_WarpRatio", prodInfo.WarpRatio));
            cmd.Parameters.Add(new SqlParameter("@p_EndsPerBeam", prodInfo.EndsPerBeam));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfBeam", prodInfo.NoOfBeam));
            cmd.Parameters.Add(new SqlParameter("@p_RopeBeam", prodInfo.RopeBeam));
            cmd.Parameters.Add(new SqlParameter("@p_NoOfCreel", prodInfo.NoOfCreel));
            cmd.Parameters.Add(new SqlParameter("@p_TotalEnd", prodInfo.TotalEnd));
            cmd.Parameters.Add(new SqlParameter("@p_MCSpeed", prodInfo.MCSpeed));
            cmd.Parameters.Add(new SqlParameter("@p_DyMCSpeed", prodInfo.DyMCSpeed));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnLot", prodInfo.ProYarnLot));
            cmd.Parameters.Add(new SqlParameter("@p_ProYarnSupp", prodInfo.ProYarnSupp));
            cmd.Parameters.Add(new SqlParameter("@p_AvgCount", prodInfo.AvgCount));
            cmd.Parameters.Add(new SqlParameter("@p_MCStartTime", prodInfo.MCStartTime));
            cmd.Parameters.Add(new SqlParameter("@p_MCStopTime", prodInfo.MCStopTime));
            cmd.Parameters.Add(new SqlParameter("@p_MCRuntime", prodInfo.MCRuntime));
            cmd.Parameters.Add(new SqlParameter("@p_MCRuntimemm", prodInfo.MCRuntimemm));
            cmd.Parameters.Add(new SqlParameter("@p_ShadePercentIndigo", prodInfo.ShadePercentIndigo));
            cmd.Parameters.Add(new SqlParameter("@p_ShadePercentBlack", prodInfo.ShadePercentBlack));
            cmd.Parameters.Add(new SqlParameter("@p_ShadeMatchWith", prodInfo.ShadeMatchWith));
            cmd.Parameters.Add(new SqlParameter("@p_Bath", prodInfo.Bath));
            cmd.Parameters.Add(new SqlParameter("@p_Feeding", prodInfo.Feeding));
            cmd.Parameters.Add(new SqlParameter("@p_Refraction", prodInfo.Refraction));
            cmd.Parameters.Add(new SqlParameter("@p_Viscosity", prodInfo.Viscosity));
            cmd.Parameters.Add(new SqlParameter("@p_Buyer", prodInfo.Buyer));
            cmd.Parameters.Add(new SqlParameter("@p_StyleNo", prodInfo.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@p_StyleCode", prodInfo.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@p_GConstruction", prodInfo.GConstruction));
            cmd.Parameters.Add(new SqlParameter("@p_FConstruction", prodInfo.FConstruction));
            cmd.Parameters.Add(new SqlParameter("@p_Weigth", prodInfo.Weigth));
            cmd.Parameters.Add(new SqlParameter("@p_Weave", prodInfo.Weave));
            cmd.Parameters.Add(new SqlParameter("@p_Width", prodInfo.Width));
            cmd.Parameters.Add(new SqlParameter("@p_AfLengthMtr", prodInfo.AfLengthMtr));
            cmd.Parameters.Add(new SqlParameter("@p_AfLengthKg", prodInfo.AfLengthKg));
            cmd.Parameters.Add(new SqlParameter("@p_DCode", prodInfo.DCode));
            cmd.Parameters.Add(new SqlParameter("@p_DName", prodInfo.DName));
            cmd.Parameters.Add(new SqlParameter("@p_PType", prodInfo.PType));
            cmd.Parameters.Add(new SqlParameter("@p_PTCode", prodInfo.PTCode));
            cmd.Parameters.Add(new SqlParameter("@p_MCNo", prodInfo.MCNo));
            cmd.Parameters.Add(new SqlParameter("@p_MCCode", prodInfo.MCCode));
            cmd.Parameters.Add(new SqlParameter("@p_UCode", prodInfo.UCode));
            cmd.Parameters.Add(new SqlParameter("@p_EDate", prodInfo.EDate));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", prodInfo.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", prodInfo.TermId));
            cmd.Parameters.Add(new SqlParameter("@p_Remarks", prodInfo.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public bool CheckIsExistSetNo(int DID, int setNo)
        {
            bool rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_dyeing_production_info", "check_Is_Exist_SetNo", DID.ToString(), setNo.ToString());
            rv = dt.Rows.Count > 0;
            return rv;
        }

        public GridEntity<DyeingProdInfo> GetDyeingProdSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<DyeingProdInfo>.GetGridData_5(options, "sp_select_dyeing_production_grid", "get_dyeing_prod_info_summary", "DID", dateFrom, dateTo);
        }

        public List<DyeingProdDetailsDyeRope> GetAllDyeRopeGridData(int dID)
        {
            return _common.Select_Data_List<DyeingProdDetailsDyeRope>("sp_select_dyeing_production_info", "get_dyeingProd_details_dyeRope_grid_data", dID.ToString());
        }

        public List<DyeingProdDetailsLCBRope> GetAllLCBRopeGridData(int dID)
        {
            return _common.Select_Data_List<DyeingProdDetailsLCBRope>("sp_select_dyeing_production_info", "get_dyeingProd_details_lCBRope_grid_data", dID.ToString());
        }

        public List<DyeingProdDetailsSizingSlasherRope> GetAllSizingGridData(int dID)
        {
            return _common.Select_Data_List<DyeingProdDetailsSizingSlasherRope>("sp_select_dyeing_production_info", "get_dyeingProd_sizing_grid_data", dID.ToString());
        }
    }
}
