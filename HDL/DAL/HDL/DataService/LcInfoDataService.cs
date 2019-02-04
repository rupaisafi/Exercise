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
    public class LcInfoDataService
    {
        private SqlDataAdapter da;
        private SqlConnection dbConn;
        private SqlCommand cmd;
        private DataSet ds;
        private DataTable dt;

        private readonly string ConnectionString =
            System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;

        private readonly CommonDataService _common = new CommonDataService();

        public ImpLcInfo SaveLcInfo(ImpLcInfo objLc, DataSet dsLcDetails)
        {
            var res = new ImpLcInfo();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_OrderInfo("sp_insert_import_lc_info", "save_lc_info", objLc, dsLcDetails);
                res.SaveStatus = Operation.Success.ToString();
                res.LcId = Convert.ToInt32(dt.Rows[0]["LcId"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable Insert_Update_OrderInfo(string procedure, string callname, ImpLcInfo objLc, DataSet rqdXmlv1 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add(new SqlParameter("@p_LcId", objLc.LcId));
            cmd.Parameters.Add(new SqlParameter("@p_SupplierId", objLc.SupplierId));
            cmd.Parameters.Add(new SqlParameter("@p_LcNo", objLc.LcNo));
            cmd.Parameters.Add(new SqlParameter("@p_LcDate", objLc.LcDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_BankId", objLc.BankId));
            cmd.Parameters.Add(new SqlParameter("@p_BranchId", objLc.BranchId));
            cmd.Parameters.Add(new SqlParameter("@p_ExpDate", objLc.ExpDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_ShipDate", objLc.ShipDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_SdExt", objLc.SdExt.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_PiNo", objLc.PiNo));
            cmd.Parameters.Add(new SqlParameter("@p_PiDate", objLc.PiDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_InvoiceNo", objLc.InvoiceNo));
            cmd.Parameters.Add(new SqlParameter("@p_InvDate", objLc.InvDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_IpNo", objLc.IpNo));
            cmd.Parameters.Add(new SqlParameter("@p_IpDate", objLc.IpDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_Vassal", objLc.Vassal));
            cmd.Parameters.Add(new SqlParameter("@p_Etd", objLc.Etd.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_Eta", objLc.Eta.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_ImpTypeId", objLc.ImpTypeId));
            cmd.Parameters.Add(new SqlParameter("@p_StatusId", objLc.StatusId));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objLc.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objLc.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<ImpLcInfo> GetLcInfoSummary(GridOptions options)
        {
            return KendoGrid<ImpLcInfo>.GetGridData_5(options, "sp_select_imp_Lc_grid", "get_imp_lc_summary", "LcId");
        }

        public List<ImpLcDetails> GetAllGridData(string lcId)
        {
            return _common.Select_Data_List<ImpLcDetails>("sp_select_imp_lc_info", "get_impLc_details_grid_data",lcId);
        }

        public bool CheckIsExist(int lcId, string lcNo)
        {
            bool rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_imp_lc_info", "check_Is_Exist", lcId.ToString(), lcNo);
            rv = dt.Rows.Count > 0;
            return rv;
        }
    }
}
