using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace DAL.HRM
{
    public class EmployeeSeparetionDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        DataTable _dt;
        private readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public string Save(HumanResource_EmployeeSeparation spr, User user)
        {
            string rv = "";
            try
            {
                _dbConn = new SqlConnection(_connectionString);
                _dbConn.Open();
                _cmd = new SqlCommand("sp_Insert_Employee_Seperation", _dbConn)
                {
                    CommandType = CommandType.StoredProcedure
                };
                _cmd.Parameters.Add(new SqlParameter("@call_name", "InsertSeperation"));
                _cmd.Parameters.Add(new SqlParameter("@EmpID", spr.EmpID));
                _cmd.Parameters.Add(new SqlParameter("@EmpStatusID", spr.EmpStatusID));
                _cmd.Parameters.Add(new SqlParameter("@SubmissionDate", spr.SubmissionDate));
                _cmd.Parameters.Add(new SqlParameter("@EffectDate", spr.EffectDate));
                _cmd.Parameters.Add(new SqlParameter("@NoticePeriod", spr.NoticePeriod));
                _cmd.Parameters.Add(new SqlParameter("@IsWaive", spr.IsWaive));
                _cmd.Parameters.Add(new SqlParameter("@Remarks", spr.Remarks));
                _cmd.Parameters.Add(new SqlParameter("@UserID", user.USERID));
                _cmd.Parameters.Add(new SqlParameter("@TerminalID", user.TermID));
                _da = new SqlDataAdapter(_cmd);
                _dt = new DataTable();
                _da.Fill(_dt);
                _dbConn.Close();
                rv = Operation.Success.ToString();
            }
            catch (Exception)
            {

                rv = Operation.Error.ToString();
            }
            return rv;            
        }

        public HumanResource_EmployeeSeparation GetEmployeeSeparation(long empId)
        {
            var res= _common.Select_Data_List<HumanResource_EmployeeSeparation>("sp_Select_Employee_Separation", "Get_Separation_For_Employee", empId.ToString()).SingleOrDefault();
            if(res == null)
            {
                res = new HumanResource_EmployeeSeparation();
            }
            return res;
        }
    }
}
