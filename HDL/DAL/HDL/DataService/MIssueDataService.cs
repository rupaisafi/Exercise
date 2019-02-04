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
    public class MIssueDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public MIssueInfo SaveMIssueInfo(MIssueInfo objMIssue, DataSet dsMIssueDetails)
        {
            var res = new MIssueInfo();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_MissueInfo("sp_insert_missue_info", "save_missue_info", objMIssue, dsMIssueDetails);
                res.SaveStatus = Operation.Success.ToString();
                res.IID = Convert.ToInt32(dt.Rows[0]["IID"].ToString());
            }
            catch (Exception ex)
            {   
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable Insert_Update_MissueInfo(string procedure, string callname, MIssueInfo objMIssue, DataSet rqdXmlv1 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add(new SqlParameter("@p_IID", objMIssue.IID));
            cmd.Parameters.Add(new SqlParameter("@p_MIssueDate", objMIssue.IssueDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_DepartmentId", objMIssue.DepartmentId));
            cmd.Parameters.Add(new SqlParameter("@p_SRNo", objMIssue.SRNo));
            cmd.Parameters.Add(new SqlParameter("@p_CompanyId", objMIssue.CompanyId));
            cmd.Parameters.Add(new SqlParameter("@p_UnitCode", objMIssue.UnitCode));
            cmd.Parameters.Add(new SqlParameter("@p_TypeFlag", objMIssue.TypeFlag));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objMIssue.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objMIssue.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<MIssueInfo> GetMIssueInfoSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<MIssueInfo>.GetGridData_5(options, "sp_select_missue_grid", "get_missue_summary", "IID", dateFrom, dateTo);
        }

        public List<MIssueDetails> GetAllGridData(string missueId)
        {
            return _common.Select_Data_List<MIssueDetails>("sp_select_missue_info", "get_missue_info", missueId);
        }
    }
}
