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
    public class MrrInfoDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public ImpLcInfo GetLcInfoByLcNo(string lcNo)
        {
            return _common.Select_Data_List<ImpLcInfo>("sp_select_Common_info", "get_LcInfo_by_LcNo", lcNo).SingleOrDefault();
        }

        public List<ItemInfoEntity> GetItemByLcNo(string lcNo)
        {
            return _common.Select_Data_List<ItemInfoEntity>("sp_select_mrr_info", "get_item_by_Lcno", lcNo);
        }

        public List<MrrBalance> GetMrrBalanceSummary(GridOptions options, string lcNo)
        {
            return _common.Select_Data_List<MrrBalance>("sp_select_mrr_info", "get_mrr_balance_info", lcNo);
        }

        public MrrInformation SaveMrrInfo(MrrInformation objMrr, DataSet dsMrrDetails)
        {
            var res = new MrrInformation();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_MReceiveInfo("sp_insert_mreceive_info", "save_mreceive_info", objMrr, dsMrrDetails);
                res.SaveStatus = Operation.Success.ToString();
                res.RID = Convert.ToInt32(dt.Rows[0]["RID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable Insert_Update_MReceiveInfo(string procedure, string callname, MrrInformation objMrr, DataSet rqdXmlv1 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add(new SqlParameter("@p_RID", objMrr.RID));
            cmd.Parameters.Add(new SqlParameter("@p_MrrDate", objMrr.MrrDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_SupplierId", objMrr.SupplierId));
            cmd.Parameters.Add(new SqlParameter("@p_LCNo", objMrr.LCNo));
            cmd.Parameters.Add(new SqlParameter("@p_LCDate", objMrr.LCDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_PINo", objMrr.PINo));
            cmd.Parameters.Add(new SqlParameter("@p_PIDate", objMrr.PIDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_InvNo", objMrr.InvNo));
            cmd.Parameters.Add(new SqlParameter("@p_InvDate", objMrr.InvDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_InvValue", objMrr.InvValue));
            cmd.Parameters.Add(new SqlParameter("@p_MRRNo", objMrr.MRRNo));
            cmd.Parameters.Add(new SqlParameter("@p_TruckNo", objMrr.TruckNo));
            cmd.Parameters.Add(new SqlParameter("@p_LCode", objMrr.LCode));
            cmd.Parameters.Add(new SqlParameter("@p_LName", objMrr.LName));
            cmd.Parameters.Add(new SqlParameter("@p_ImpTypeId", objMrr.ImpTypeId));
            cmd.Parameters.Add(new SqlParameter("@p_BLNo", objMrr.BLNo));
            cmd.Parameters.Add(new SqlParameter("@p_BLDate", objMrr.BLDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_BENo", objMrr.BENo));
            cmd.Parameters.Add(new SqlParameter("@p_BEDate", objMrr.BEDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_IPNo", objMrr.IPNo));
            cmd.Parameters.Add(new SqlParameter("@p_IPDate", objMrr.IPDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_CompanyId", objMrr.CompanyId));
            cmd.Parameters.Add(new SqlParameter("@p_UserName", objMrr.UserName));
            cmd.Parameters.Add(new SqlParameter("@p_EDate", DateTime.Now.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_Remarks", objMrr.Remarks));
            cmd.Parameters.Add(new SqlParameter("@p_PaymentId", objMrr.PaymentId));
            cmd.Parameters.Add(new SqlParameter("@p_Payment", objMrr.Payment));
            cmd.Parameters.Add(new SqlParameter("@p_PartialNo", objMrr.PartialNo));
            cmd.Parameters.Add(new SqlParameter("@p_ChallanNo", objMrr.ChallanNo));
            cmd.Parameters.Add(new SqlParameter("@p_ChallanDate", objMrr.ChallanDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_CertificateNo", objMrr.CertificateNo));
            cmd.Parameters.Add(new SqlParameter("@p_TrackDate", DateTime.Now.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objMrr.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objMrr.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<MrrInformation> GetMrrInfoSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<MrrInformation>.GetGridData_5(options, "sp_select_mreceive_grid", "get_mreceive_summary", "RID",dateFrom,dateTo);
        }

        public List<MrrDetails> GetAllGridData(string mrrId)
        {
            return _common.Select_Data_List<MrrDetails>("sp_select_mrr_info", "get_mrr_info", mrrId);
        }
    }
}
