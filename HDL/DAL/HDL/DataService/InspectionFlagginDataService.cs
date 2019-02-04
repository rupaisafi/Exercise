using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
   public class InspectionFlagginDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<Department> GetDept()
        {
            return _service.Select_Data_List<Department>("sp_select_Insp_Flaggin_info", "GET_DEPT").ToList();
        }
        public List<EmployeeInfo> GetOperator()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_Insp_Flaggin_info", "GET_Operator").ToList();
        }
        public List<EmployeeInfo> GetPO()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_Insp_Flaggin_info", "GET_PO").ToList();
        }
        public List<InspectionFlagginQuality> GetQuality()
        {
            return _service.Select_Data_List<InspectionFlagginQuality>("sp_select_Insp_Flaggin_info", "GET_QUALITY").ToList();
        }

        public GridEntity<InspFlagginMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<InspFlagginMaster>.GetGridData_5(options, "sp_select_Insp_flaggin_grid", "GET_SUMMARY", "ID", dateFrom, dateTo);
        }
        public string SaveMasterInfo(InspFlagginMaster objMaster)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_MasterInfo("sp_insert_insp_flaggin_master_info", "SAVE_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["ID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, InspFlagginMaster objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@ID", objMaster.ID));
            cmd.Parameters.Add(new SqlParameter("@FDate", objMaster.FDate));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objMaster.Remarks));
            cmd.Parameters.Add(new SqlParameter("@UserName", objMaster.UserName));
            cmd.Parameters.Add(new SqlParameter("@InsFloorCode", objMaster.InsFloorCode));
            cmd.Parameters.Add(new SqlParameter("@InsFloorName", objMaster.InsFloorName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public string SaveDetailInfo(InspFlagginDetail obj)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_DetailInfo("sp_insert_insp_flaggin_Detail_info", "SAVE_DETAIL", obj);
                rv = Operation.Success.ToString();
                return result.Rows[0]["IID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_DetailInfo(string procedure, string callname, InspFlagginDetail obj)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@IID", obj.IID));
            cmd.Parameters.Add(new SqlParameter("@ID", obj.ID));
            cmd.Parameters.Add(new SqlParameter("@DCode", obj.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", obj.DName));
            cmd.Parameters.Add(new SqlParameter("@OName", obj.OName));
            cmd.Parameters.Add(new SqlParameter("@OCode", obj.OCode));
            cmd.Parameters.Add(new SqlParameter("@CapName", obj.CapName));
            cmd.Parameters.Add(new SqlParameter("@CapCode", obj.CapCode));
            cmd.Parameters.Add(new SqlParameter("@RollNo", obj.RollNo));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", obj.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", obj.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@YdsOpOBS", obj.YdsOpOBS));
            cmd.Parameters.Add(new SqlParameter("@YdsReChOBS", obj.YdsReChOBS));
            cmd.Parameters.Add(new SqlParameter("@DeffOpOBS", obj.DeffOpOBS));
            cmd.Parameters.Add(new SqlParameter("@DeffReChOBS", obj.DeffReChOBS));
            cmd.Parameters.Add(new SqlParameter("@QOpOBS", obj.QOpOBS));
            cmd.Parameters.Add(new SqlParameter("@QReChOBS", obj.QReChOBS));
            cmd.Parameters.Add(new SqlParameter("@PointOpOBS", obj.PointOpOBS));
            cmd.Parameters.Add(new SqlParameter("@PointReChOBS", obj.PointReChOBS));
            cmd.Parameters.Add(new SqlParameter("@WidthAvg", obj.WidthAvg));
            cmd.Parameters.Add(new SqlParameter("@SinglePoint", obj.SinglePoint));
            cmd.Parameters.Add(new SqlParameter("@Remarks", obj.Remarks));
            cmd.Parameters.Add(new SqlParameter("@UserName", obj.UserName));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public List<InspFlagginDetail> GetFlagginDetailByID(string ID)
        {
            return _service.Select_Data_List<InspFlagginDetail>("sp_select_Insp_Flaggin_info", "GET_DETAIL_BY_ID", ID.ToString()).ToList();
        }

    }
}
