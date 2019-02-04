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
    public class YarnDyeingDataService
    {
        //SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        SqlDataAdapter da;
        string connectionString = ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public List<DyeingYarnDetail> GetDyeingYarnDetail(int idNo)
        {
            var result = _common.Select_Data_List<DyeingYarnDetail>("SP_SELECT_DYEING_YARN_INFO", "GET_DYEING_YARN_DETAIL_BY_IDNO", idNo.ToString()).ToList();
            return result;
        }
        public GridEntity<DyeingYarn> GetDyeingYarnSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<DyeingYarn>.GetGridData_5(options, "sp_select_dyeing_yarn_grid", "get_dyeing_yarn_info_summary", "DID", dateFrom, dateTo);
        }

        public DyeingYarn SaveYarnDyeingInfo(DyeingYarn dyeingYarn, DataSet dyeingYarnDetail)
        {
            var res = new DyeingYarn();
            var dt = new DataTable();
            try
            {
                dt = InsertOrUpdateYarnDyeingInfo("SP_INSERT_DYEING_YARN_INFO", "SAVE_DYEING_YARN_INFO", dyeingYarn, dyeingYarnDetail);
                res.SaveStatus = Operation.Success.ToString();
                res.DID = Convert.ToInt32(dt.Rows[0]["DID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable InsertOrUpdateYarnDyeingInfo(string procedure, string callname, DyeingYarn dyeingYarn, DataSet dyeingYarnDetail = null)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@DetailXml", SqlDbType.Xml).Value = dyeingYarnDetail == null ? null : dyeingYarnDetail.GetXml();
            cmd.Parameters.Add(new SqlParameter("@DID", dyeingYarn.DID));
            cmd.Parameters.Add(new SqlParameter("@DyeDate", dyeingYarn.DyeDate));
            cmd.Parameters.Add(new SqlParameter("@EDate", dyeingYarn.EDate));
            cmd.Parameters.Add(new SqlParameter("@MCCode", dyeingYarn.MCCode));
            cmd.Parameters.Add(new SqlParameter("@MCNo", dyeingYarn.MCNo));
            cmd.Parameters.Add(new SqlParameter("@PTCode", dyeingYarn.PTCode));
            cmd.Parameters.Add(new SqlParameter("@PType", dyeingYarn.PType));
            cmd.Parameters.Add(new SqlParameter("@Remarks", dyeingYarn.Remarks));
            cmd.Parameters.Add(new SqlParameter("@TracDate", dyeingYarn.TracDate));
            cmd.Parameters.Add(new SqlParameter("@UCode", dyeingYarn.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", dyeingYarn.UName));
            cmd.Parameters.Add(new SqlParameter("@UserName", dyeingYarn.UserName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}
