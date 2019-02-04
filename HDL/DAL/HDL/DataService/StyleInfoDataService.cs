using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Entities.HDL.DTO;

namespace DAL.HDL.DataService
{
    public class StyleInfoDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        DataSet _ds;
        DataTable _dt;
        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();
        public Style SaveStyleInfo(Style objStyle, StyleParamFinish objFinParam, StyleParamGrey objGreyParam, StyleParamFabric objFabParam)
        {
            var rv = new Style();
            try
            {
                _dt = new DataTable();
                _dt = Insert_Update_StyleInfo("sp_insert_style_info", "savestyleinfo", objStyle, objFinParam, objGreyParam, objFabParam);
                rv.SID = Convert.ToInt32(_dt.Rows[0]["SID"].ToString());
                rv.SaveStatus = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv.SaveStatus = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_StyleInfo(string procedure, string callname, Style objStyle, StyleParamFinish objFinParam, StyleParamGrey objGreyParam, StyleParamFabric objFabParam)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn) { CommandType = CommandType.StoredProcedure };

            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            _cmd.Parameters.Add(new SqlParameter("@p_SID", objStyle.SID));
            _cmd.Parameters.Add(new SqlParameter("@p_UCode", objStyle.UCode));
            _cmd.Parameters.Add(new SqlParameter("@p_FabTypeCode", objStyle.FabricTypeCode));
            _cmd.Parameters.Add(new SqlParameter("@p_DevolopmentDate", objStyle.DevolopmentDate));
            _cmd.Parameters.Add(new SqlParameter("@p_PDNo", objStyle.PDNo));
            _cmd.Parameters.Add(new SqlParameter("@p_StyleNo", objStyle.StyleNo));
            _cmd.Parameters.Add(new SqlParameter("@p_StyleCode", objStyle.StyleCode));
            _cmd.Parameters.Add(new SqlParameter("@p_Weight", objStyle.Weight));
            _cmd.Parameters.Add(new SqlParameter("@p_Width", objStyle.Width));
            _cmd.Parameters.Add(new SqlParameter("@p_Shrinkage", objStyle.Shrinkage));
            _cmd.Parameters.Add(new SqlParameter("@p_Construction", objStyle.Construction));
            _cmd.Parameters.Add(new SqlParameter("@p_FConstruction", objStyle.FConstruction));
            _cmd.Parameters.Add(new SqlParameter("@p_YarnCode", objStyle.YarnCode));
            _cmd.Parameters.Add(new SqlParameter("@p_FabricDesc", objStyle.FabricDesc));
            _cmd.Parameters.Add(new SqlParameter("@p_FinishingRoute", objStyle.FinishingRoute));
            _cmd.Parameters.Add(new SqlParameter("@p_WarpRatio", objStyle.WarpRatio));
            _cmd.Parameters.Add(new SqlParameter("@p_WeftRatio", objStyle.WeftRatio));
            _cmd.Parameters.Add(new SqlParameter("@p_TEnds", objStyle.TEnds));
            _cmd.Parameters.Add(new SqlParameter("@p_Weave", objStyle.Weave));
            _cmd.Parameters.Add(new SqlParameter("@p_SetStd", objStyle.SetStd));
            _cmd.Parameters.Add(new SqlParameter("@p_ColorId", objStyle.ColorId));
            _cmd.Parameters.Add(new SqlParameter("@p_ShadeIndigo", objStyle.ShadeIndigo));
            _cmd.Parameters.Add(new SqlParameter("@p_ShadeBlack", objStyle.ShadeBlack));
            _cmd.Parameters.Add(new SqlParameter("@p_WarpSupp", objStyle.WarpSupp));
            _cmd.Parameters.Add(new SqlParameter("@p_WarpLot", objStyle.WarpLot));
            _cmd.Parameters.Add(new SqlParameter("@p_WeftSupp", objStyle.WeftSupp));
            _cmd.Parameters.Add(new SqlParameter("@p_WeftLot", objStyle.WeftLot));
            _cmd.Parameters.Add(new SqlParameter("@p_BuyerRef", objStyle.BuyerRef));
            _cmd.Parameters.Add(new SqlParameter("@p_GreadCode", objStyle.GreadCode));
            _cmd.Parameters.Add(new SqlParameter("@p_PYear", objStyle.PYear));
            _cmd.Parameters.Add(new SqlParameter("@p_Unit", objStyle.Unit));
            _cmd.Parameters.Add(new SqlParameter("@p_HSCode", objStyle.HSCode));
            _cmd.Parameters.Add(new SqlParameter("@p_SRate", objStyle.SRate));
            _cmd.Parameters.Add(new SqlParameter("@p_Rate1", objStyle.Rate1));
            _cmd.Parameters.Add(new SqlParameter("@p_StatusCode", objStyle.StatusCode));
            _cmd.Parameters.Add(new SqlParameter("@p_Trace", objStyle.Trace));
            _cmd.Parameters.Add(new SqlParameter("@p_Remarks", objStyle.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_EntryDate", objStyle.EntryDate));
            _cmd.Parameters.Add(new SqlParameter("@p_FG", objStyle.FG));
            _cmd.Parameters.Add(new SqlParameter("@p_WarpCons", objStyle.WarpCons));
            _cmd.Parameters.Add(new SqlParameter("@p_WeftCons", objStyle.WeftCons));
            _cmd.Parameters.Add(new SqlParameter("@p_CheCons", objStyle.CheCons));
            _cmd.Parameters.Add(new SqlParameter("@p_RPM", objStyle.RPM));
            _cmd.Parameters.Add(new SqlParameter("@p_Effi", objStyle.Effi));
            _cmd.Parameters.Add(new SqlParameter("@p_FCode", objStyle.FinishTypeCode));
            _cmd.Parameters.Add(new SqlParameter("@p_CSV", objStyle.CSV));
            _cmd.Parameters.Add(new SqlParameter("@p_SpecialityCode", objStyle.SpecialityCode));
            _cmd.Parameters.Add(new SqlParameter("@p_CutableWidth", objStyle.CutableWidth));
            _cmd.Parameters.Add(new SqlParameter("@p_StdCrimp", objStyle.StdCrimp));
            _cmd.Parameters.Add(new SqlParameter("@p_StdShrink", objStyle.StdShrink));
            _cmd.Parameters.Add(new SqlParameter("@p_UserId", objStyle.UserId));
            _cmd.Parameters.Add(new SqlParameter("@p_TermId", objStyle.TermId));

            //---------------Finish Param-----------------------------------------------
            _cmd.Parameters.Add(new SqlParameter("@p_WarpShrinkage", objFinParam.WarpShrinkage));
            _cmd.Parameters.Add(new SqlParameter("@p_WeftShrinkage", objFinParam.WeftShrinkage));
            _cmd.Parameters.Add(new SqlParameter("@p_WeightFinish", objFinParam.WeightFinish));
            _cmd.Parameters.Add(new SqlParameter("@p_WeightWash", objFinParam.WeightWash));
            _cmd.Parameters.Add(new SqlParameter("@p_Skew", objFinParam.Skew));
            _cmd.Parameters.Add(new SqlParameter("@p_Movement", objFinParam.Movement));
            _cmd.Parameters.Add(new SqlParameter("@p_StretchAbblity", objFinParam.StretchAbblity));
            _cmd.Parameters.Add(new SqlParameter("@p_Growth", objFinParam.Growth));
            _cmd.Parameters.Add(new SqlParameter("@p_Recovery", objFinParam.Recovery));
            _cmd.Parameters.Add(new SqlParameter("@p_RemarksFin", objFinParam.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_ShirnkEnzyme", objFinParam.ShirnkEnzyme));
            _cmd.Parameters.Add(new SqlParameter("@p_ShrinkBleach", objFinParam.ShrinkBleach));

            //---------------Grey Param-----------------------------------------------
            _cmd.Parameters.Add(new SqlParameter("@p_GreyShrinkageWarp", objGreyParam.GreyShrinkageWarp));
            _cmd.Parameters.Add(new SqlParameter("@p_GreyShrinkageWeft", objGreyParam.GreyShrinkageWeft));
            _cmd.Parameters.Add(new SqlParameter("@p_GreyWeigth", objGreyParam.GreyWeigth));
            _cmd.Parameters.Add(new SqlParameter("@p_GreyWashWeigth", objGreyParam.GreyWashWeigth));
            _cmd.Parameters.Add(new SqlParameter("@p_GreySkew", objGreyParam.GreySkew));
            _cmd.Parameters.Add(new SqlParameter("@p_GreyStretchAbblity", objGreyParam.GreyStretchAbblity));
            _cmd.Parameters.Add(new SqlParameter("@p_GreyWidth", objGreyParam.GreyWidth));
            _cmd.Parameters.Add(new SqlParameter("@p_GEPI", objGreyParam.GEPI));
            _cmd.Parameters.Add(new SqlParameter("@p_GPPI", objGreyParam.GPPI));
            _cmd.Parameters.Add(new SqlParameter("@p_RemarksGrey", objGreyParam.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_RPMGrey", objGreyParam.RPM));
            _cmd.Parameters.Add(new SqlParameter("@p_EffiGrey", objGreyParam.Effi));
            _cmd.Parameters.Add(new SqlParameter("@p_Crime", objGreyParam.Crime));
            _cmd.Parameters.Add(new SqlParameter("@p_ReedSpaceGrey", objGreyParam.ReedSpace));
            _cmd.Parameters.Add(new SqlParameter("@p_ReedCount", objGreyParam.ReedCount));
            _cmd.Parameters.Add(new SqlParameter("@p_EndsDent", objGreyParam.EndsDent));

            //---------------Fabric Param-----------------------------------------------
            _cmd.Parameters.Add(new SqlParameter("@p_TensileStrengthWarp", objFabParam.TensileStrengthWarp));
            _cmd.Parameters.Add(new SqlParameter("@p_TensileStrengthWeft", objFabParam.TensileStrengthWeft));
            _cmd.Parameters.Add(new SqlParameter("@p_TearingStrengthWarp", objFabParam.TearingStrengthWarp));
            _cmd.Parameters.Add(new SqlParameter("@p_TearingStrengthWeft", objFabParam.TearingStrengthWeft));
            _cmd.Parameters.Add(new SqlParameter("@p_CrockingFastnessDry", objFabParam.CrockingFastnessDry));
            _cmd.Parameters.Add(new SqlParameter("@p_CrockingFastnessWeft", objFabParam.CrockingFastnessWeft));
            _cmd.Parameters.Add(new SqlParameter("@p_ColourFastnessWash", objFabParam.ColourFastnessWash));
            _cmd.Parameters.Add(new SqlParameter("@p_ColourFastnessAcetate", objFabParam.ColourFastnessAcetate));
            _cmd.Parameters.Add(new SqlParameter("@p_ColourFastnessCotton", objFabParam.ColourFastnessCotton));
            _cmd.Parameters.Add(new SqlParameter("@p_ColourFastnessNylon", objFabParam.ColourFastnessNylon));
            _cmd.Parameters.Add(new SqlParameter("@p_ColourFastnessPolyster", objFabParam.ColourFastnessPolyster));
            _cmd.Parameters.Add(new SqlParameter("@p_ColourFastnessAcrylic", objFabParam.ColourFastnessAcrylic));
            _cmd.Parameters.Add(new SqlParameter("@p_ColourFastnessWool", objFabParam.ColourFastnessWool));
            _cmd.Parameters.Add(new SqlParameter("@p_PH", objFabParam.PH));
            _cmd.Parameters.Add(new SqlParameter("@p_Moisture", objFabParam.Moisture));
            _cmd.Parameters.Add(new SqlParameter("@p_Steffness", objFabParam.Steffness));
            _cmd.Parameters.Add(new SqlParameter("@p_PickEffi", objFabParam.PickEffi));
            _cmd.Parameters.Add(new SqlParameter("@p_RPMFab", objFabParam.RPM));
            _cmd.Parameters.Add(new SqlParameter("@p_ValueLoss", objFabParam.ValueLoss));
            _cmd.Parameters.Add(new SqlParameter("@p_RemarksFab", objFabParam.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_ReedSpaceFab", objFabParam.ReedSpace));

            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }
        public GridEntity<StyleInformation> GetStyleInfoSummary(GridOptions options, string dateFrom, string dateTo, string styleNo)
        {
            var style = KendoGrid<StyleInformation>.GetGridData_5(options, "sp_select_style_grid", "get_style_summary", "StyleNo",dateFrom,dateTo,styleNo);
            return style;
        }

        public List<Style> GetAllStyle()
        {
            return _common.Select_Data_List<Style>("sp_select_style_info", "get_all_style");
        }

        public Style GenerateMaxStyleCode()
        {
            var rv = new Style();
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_style_info", "get_max_style_code");
            rv.StyleCode = Convert.ToInt32(dt.Rows[0]["StyleCode"].ToString());
            return rv;
        }

        public bool CheckIsExist(int styleCode, string styleNo)
        {
            var rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_style_info", "Check_Is_Exist",styleNo,styleCode.ToString());
            if (dt.Rows.Count > 0)
            {
                rv = true;
            }
            return rv;
        }
    }
}
