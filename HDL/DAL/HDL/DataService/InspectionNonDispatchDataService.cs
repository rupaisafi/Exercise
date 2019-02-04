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
    public class InspectionNonDispatchDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public List<SetInfoEntity> GetPlanningSetNo()
        {
            return _service.Select_Data_List<SetInfoEntity>("sp_select_Insp_non_dispatch_info", "GET_ALL_SETNO").ToList();
        }
        public List<InspDyeInfo> GetDyeingFault()
        {
            return _service.Select_Data_List<InspDyeInfo>("sp_select_Insp_non_dispatch_info", "GET_ALL_DYEING_FAULT").ToList();
        }
        public List<EmployeeInfo> GetPO()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_Insp_non_dispatch_info", "GET_PO").ToList();
        }
        public List<Department> GetDept()
        {
            return _service.Select_Data_List<Department>("sp_select_Insp_non_dispatch_info", "GET_DEPT").ToList();
        }
        public string SaveMasterInfo(InspNonDispatchMaster objMaster)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_MasterInfo("sp_insert_inspection_non_dispatch_master_info", "SAVE_NON_DISPATCH_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["NID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, InspNonDispatchMaster objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@NID", objMaster.NID));
            cmd.Parameters.Add(new SqlParameter("@NDate", objMaster.NDate));
            cmd.Parameters.Add(new SqlParameter("@UCode", objMaster.UCode));
            cmd.Parameters.Add(new SqlParameter("@UName", objMaster.UName));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objMaster.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public string SaveDetailInfo(InspNonDispatchDetail obj)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_DetailInfo("sp_insert_inspection_non_dispatch_detail_info", "SAVE_NON_DISPATCH_DETAIL", obj);
                rv = Operation.Success.ToString();
                return result.Rows[0]["NIID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_DetailInfo(string procedure, string callname, InspNonDispatchDetail obj)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@NIID", obj.NIID));
            cmd.Parameters.Add(new SqlParameter("@NID", obj.NID));
            cmd.Parameters.Add(new SqlParameter("@StyleNo", obj.StyleNo));
            cmd.Parameters.Add(new SqlParameter("@StyleCode", obj.StyleCode));
            cmd.Parameters.Add(new SqlParameter("@SetNo", obj.SetNo));
            cmd.Parameters.Add(new SqlParameter("@RollNo", obj.RollNo));
            cmd.Parameters.Add(new SqlParameter("@Qnty", obj.Qnty));
            cmd.Parameters.Add(new SqlParameter("@FaultName", obj.FaultName));
            cmd.Parameters.Add(new SqlParameter("@FaultCode", obj.FaultCode));
            cmd.Parameters.Add(new SqlParameter("@DName", obj.DName));
            cmd.Parameters.Add(new SqlParameter("@DCode", obj.DCode));
            cmd.Parameters.Add(new SqlParameter("@POName", obj.POName));
            cmd.Parameters.Add(new SqlParameter("@OPName", obj.OPName));
            cmd.Parameters.Add(new SqlParameter("@FMCName", obj.FMCName));
            cmd.Parameters.Add(new SqlParameter("@FMCCode", obj.FMCCode));
            cmd.Parameters.Add(new SqlParameter("@Remarks", obj.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public GridEntity<InspNonDispatchMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return KendoGrid<InspNonDispatchMaster>.GetGridData_5(options, "sp_select_inspection_non_dispatch_grid", "GET_SUMMARY", "NID", dateFrom, dateTo);
        }
        public List<InspNonDispatchDetail> GetDetailByID(string NID)
        {
            return _service.Select_Data_List<InspNonDispatchDetail>("sp_select_Insp_non_dispatch_info", "GET_DETAIL_BY_ID", NID.ToString()).ToList();
        }
    }
}
