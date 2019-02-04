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
    public class WeavingProductionDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public int GetNextWeavingID()
        {
            var weavingMaster = _service.Select_Data_List<WeavingMaster>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_NEXT_WEAVING_ID").SingleOrDefault();
            if (weavingMaster != null)
            {
                return weavingMaster.WID;
            }
            else
            {
                return 0;
            }
        }
        public List<EmployeeInfo> GetProductionFitter()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_ALL_PRODUCTION_FITTER").ToList();
        }
        public List<EmployeeInfo> GetProductionLineman()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_ALL_PRODUCTION_LINEMAN").ToList();
        }
        public List<EmployeeInfo> GetProductionOperator()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_ALL_PRODUCTION_OPERATOR").ToList();
        }
        public List<SetInfoEntity> GetProductionSetNo()
        {
            return _service.Select_Data_List<SetInfoEntity>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_ALL_PRODUCTION_SET_NO").ToList();
        }
        public List<DyeingProdDetailsSizingSlasherRope> GetProductionSLNo(string setNo)
        {
            return _service.Select_Data_List<DyeingProdDetailsSizingSlasherRope>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_ALL_PRODUCTION_SL_NO", setNo).ToList();
        }
        public List<Style> GetProductionStyleNo()
        {
            return _service.Select_Data_List<Style>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_ALL_PRODUCTION_STYLE_NO").ToList();
        }
        public List<WeavingProduction> GetProductionDetail(string wID)
        {
            return _service.Select_Data_List<WeavingProduction>("SP_SELECT_WEAVING_PRODUCTION_INFO", "GET_ALL_PRODUCTION_BY_MASTER_ID", wID).ToList();
        }
        public GridEntity<WeavingMaster> GetProductionSummary(GridOptions options, string from, string to)
        {
            return KendoGrid<WeavingMaster>.GetGridData_5(options, "SP_SELECT_WEAVING_PRODUCTION_GRID", "GET_PRODUCTION_SUMMARY", "WID", from, to);
        }
        public WeavingMaster SaveWeavingMaster(WeavingMaster master)
        {
            var res = new WeavingMaster();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_WeavingMaster("sp_insert_weaving_master_info", "save_weaving_master", master);
                res.SaveStatus = Operation.Success.ToString();
                res.WID = Convert.ToInt32(dt.Rows[0]["WID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable Insert_Update_WeavingMaster(string procedure, string callname, WeavingMaster master)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@WID", master.WID));
            cmd.Parameters.Add(new SqlParameter("@WeaveDate", master.WeaveDate.ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new SqlParameter("@TrackDate", master.TrackDate.Value.ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new SqlParameter("@DeptNo", master.DeptNo));
            cmd.Parameters.Add(new SqlParameter("@DeptName", master.DeptName));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode", master.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@ShiftName", master.ShiftName));
            cmd.Parameters.Add(new SqlParameter("@WorkerShift", master.WorkerShift));
            cmd.Parameters.Add(new SqlParameter("@UserName", master.UserName));
            cmd.Parameters.Add(new SqlParameter("@EntryDate", master.EntryDate.Value.ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new SqlParameter("@UnitNo", master.UnitNo));
            cmd.Parameters.Add(new SqlParameter("@UnitCode", master.UnitCode));
            cmd.Parameters.Add(new SqlParameter("@NoOfMC", master.NoOfMC));
            cmd.Parameters.Add(new SqlParameter("@POName", master.POName));
            cmd.Parameters.Add(new SqlParameter("@POCode", master.POCode));
            cmd.Parameters.Add(new SqlParameter("@CaptainName", master.CaptainName));
            cmd.Parameters.Add(new SqlParameter("@CaptainCode", master.CaptainCode));
            cmd.Parameters.Add(new SqlParameter("@AstSuperName", master.AstSuperName));
            cmd.Parameters.Add(new SqlParameter("@AstSuperCode", master.AstSuperCode));
            cmd.Parameters.Add(new SqlParameter("@LineManName", master.LineManName));
            cmd.Parameters.Add(new SqlParameter("@LineManCode", master.LineManCode));
            cmd.Parameters.Add(new SqlParameter("@MC", master.MC));
            cmd.Parameters.Add(new SqlParameter("@LineManName2", master.LineManName2));
            cmd.Parameters.Add(new SqlParameter("@MC2", master.MC2));
            cmd.Parameters.Add(new SqlParameter("@BeamFitterName", master.BeamFitterName));
            cmd.Parameters.Add(new SqlParameter("@BeamFitterCode", master.BeamFitterCode));
            cmd.Parameters.Add(new SqlParameter("@FitterName", master.FitterName));
            cmd.Parameters.Add(new SqlParameter("@FitterCode", master.FitterCode));
            cmd.Parameters.Add(new SqlParameter("@UCode", master.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", master.UName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public WeavingProduction SaveWeavingProduction(WeavingProduction production)
        {
            var res = new WeavingProduction();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_WeavingProduction("sp_insert_weaving_production_info", "save_weaving_production", production);
                res.SaveStatus = Operation.Success.ToString();
                res.WIID = Convert.ToInt32(dt.Rows[0]["WIID"].ToString());
                //
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable Insert_Update_WeavingProduction(string procedure, string callname, WeavingProduction production)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@WIID", production.WIID));
            cmd.Parameters.Add(new SqlParameter("@WID", production.WID));
            cmd.Parameters.Add(new SqlParameter("@Shift", production.Shift));
            cmd.Parameters.Add(new SqlParameter("@WorkerShift", production.WorkerShift));
            cmd.Parameters.Add(new SqlParameter("@Loom", production.Loom));
            cmd.Parameters.Add(new SqlParameter("@RPM", production.RPM));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", production.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", production.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@Weight", production.Weight));
            cmd.Parameters.Add(new SqlParameter("@PPI", production.PPI));
            cmd.Parameters.Add(new SqlParameter("@TotalPicks", production.TotalPicks));
            cmd.Parameters.Add(new SqlParameter("@MCEfficiency", production.MCEfficiency));
            cmd.Parameters.Add(new SqlParameter("@ProdEfficiency", production.ProdEfficiency));
            cmd.Parameters.Add(new SqlParameter("@TotalProd", production.TotalProd));
            cmd.Parameters.Add(new SqlParameter("@WarpStop", production.WarpStop));
            cmd.Parameters.Add(new SqlParameter("@WeftStop", production.WeftStop));
            cmd.Parameters.Add(new SqlParameter("@Remarks", production.Remarks));
            cmd.Parameters.Add(new SqlParameter("@OCode", production.OCode));
            cmd.Parameters.Add(new SqlParameter("@OName", production.OName));
            cmd.Parameters.Add(new SqlParameter("@LoomCode", production.LoomCode));
            cmd.Parameters.Add(new SqlParameter("@SetNo", production.SetNo));
            cmd.Parameters.Add(new SqlParameter("@SL", production.SL));
            cmd.Parameters.Add(new SqlParameter("@Flange", production.Flange));
            cmd.Parameters.Add(new SqlParameter("@Constraction", production.Constraction));
            cmd.Parameters.Add(new SqlParameter("@WarpCmpx", production.WarpCmpx));
            cmd.Parameters.Add(new SqlParameter("@WeftCmpx", production.WeftCmpx));
            cmd.Parameters.Add(new SqlParameter("@OtherStop", production.OtherStop));
            cmd.Parameters.Add(new SqlParameter("@RunTime", production.RunTime));
            cmd.Parameters.Add(new SqlParameter("@ShiftCode", production.ShiftCode));
            cmd.Parameters.Add(new SqlParameter("@UserName", production.UserName));
            cmd.Parameters.Add(new SqlParameter("@EDate", production.EDate.Value.ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new SqlParameter("@GConstraction", production.GConstraction));
            cmd.Parameters.Add(new SqlParameter("@FConstraction", production.FConstraction));
            cmd.Parameters.Add(new SqlParameter("@Width", production.Width));
            cmd.Parameters.Add(new SqlParameter("@Weave", production.Weave));
            cmd.Parameters.Add(new SqlParameter("@Colour", production.Colour));
            cmd.Parameters.Add(new SqlParameter("@RunTime1", production.RunTime1));
            cmd.Parameters.Add(new SqlParameter("@RunTime2", production.RunTime2));
            cmd.Parameters.Add(new SqlParameter("@GaraYarn", production.GaraYarn));
            cmd.Parameters.Add(new SqlParameter("@LineManName", production.LineManName));
            cmd.Parameters.Add(new SqlParameter("@LineManCode", production.LineManCode));
            cmd.Parameters.Add(new SqlParameter("@FitterName", production.FitterName));
            cmd.Parameters.Add(new SqlParameter("@FitterCode", production.FitterCode));
            cmd.Parameters.Add(new SqlParameter("@ShortLength", production.ShortLength));
            cmd.Parameters.Add(new SqlParameter("@UCode", production.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", production.UName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}
