using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HDL;
using Entities.HRM;

namespace DAL.HRM
{
    public class AttendanceProcessDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        DataTable _dt;
        private readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public void Process(ProcessDate p, User user)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand("sp_Process_Attendance", _dbConn)
            {
                CommandType = CommandType.StoredProcedure
            };
            _cmd.Parameters.Add(new SqlParameter("@call_name", "Process_By_ID"));
            _cmd.Parameters.Add(new SqlParameter("@EmpID", p.EmpID));
            _cmd.Parameters.Add(new SqlParameter("@StartDate", p.StartDate.ToString("yyyy-MM-dd")));
            _cmd.Parameters.Add(new SqlParameter("@EndDate", p.EndDate.ToString("yyyy-MM-dd")));
            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
        }
    }
}
