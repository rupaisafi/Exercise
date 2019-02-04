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
    public class CausticRecoveryDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();

        public string SaveMasterInfo(CausticRecovery objMaster)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_MasterInfo("sp_insert_caustic_recovery_info", "SAVE_FINISHING_STOCK_MASTER", objMaster);
                rv = Operation.Success.ToString();
                return result.Rows[0]["CID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_MasterInfo(string procedure, string callname, CausticRecovery objMaster)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@CID", objMaster.CID));
            cmd.Parameters.Add(new SqlParameter("@CDate", objMaster.CDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@DCode", objMaster.DCode));
            cmd.Parameters.Add(new SqlParameter("@DName", objMaster.DName));
            cmd.Parameters.Add(new SqlParameter("@WeaklyCusticInM3", objMaster.WeaklyCusticInM3));
            cmd.Parameters.Add(new SqlParameter("@WeaklyCusticBoom", objMaster.WeaklyCusticBoom));
            cmd.Parameters.Add(new SqlParameter("@RecoveryCausticM3", objMaster.RecoveryCausticM3));
            cmd.Parameters.Add(new SqlParameter("@RecoveryCausticBoom", objMaster.RecoveryCausticBoom));
            cmd.Parameters.Add(new SqlParameter("@Remarks", objMaster.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }



    }
}
