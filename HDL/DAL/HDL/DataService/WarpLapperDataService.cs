using DAL.Common;
using DBManager;
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
    public class WarpLapperDataService
    {
        //SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        SqlDataAdapter da;
        string connectionString = ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public List<WarpingProdInfo> GetWarpingBySetNo(string setNo)
        {
            var result = _common.Select_Data_List<WarpingProdInfo>("SP_SELECT_WARP_LAPPER_INFO", "GET_WARPING_PRODUCTION_BY_SETNO", setNo).ToList();
            return result;
        }
        public List<WarpingProdDetails> GetWarpingDetailByIdNo(string idNo)
        {
            var result = _common.Select_Data_List<WarpingProdDetails>("SP_SELECT_WARP_LAPPER_INFO", "GET_WARPING_PRODUCTION_DETAIL_BY_IDNO", idNo).ToList();
            return result;
        }
        public WarpingProdDetails SaveWarpDetail(WarpingProdDetails prodDetails)
        {
            var res = new WarpingProdDetails();
            var dt = new DataTable();
            try
            {
                dt = UpdateWarpDetail("SP_INSERT_WARPING_PRODUCTION_DETAIL", "SAVE_DETAIL", prodDetails);
                res.SaveStatus = Operation.Success.ToString();
                res.Wdid = Convert.ToInt32(dt.Rows[0]["Wdid"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable UpdateWarpDetail(string procedure, string callname, WarpingProdDetails prodDetails)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@Wdid", prodDetails.Wdid));
            cmd.Parameters.Add(new SqlParameter("@WarpDate", prodDetails.WarpDate));
            cmd.Parameters.Add(new SqlParameter("@ICode", prodDetails.ICode));
            cmd.Parameters.Add(new SqlParameter("@FlangeNo", prodDetails.FlangeNo));
            cmd.Parameters.Add(new SqlParameter("@FlangeLength", prodDetails.FlangeLength));
            cmd.Parameters.Add(new SqlParameter("@Lapper", prodDetails.Lapper));
            cmd.Parameters.Add(new SqlParameter("@OperatorCardNo", prodDetails.OperatorCardNo));
            cmd.Parameters.Add(new SqlParameter("@CapCode", prodDetails.CapCode));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}
