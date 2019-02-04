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
    public class EmployeeWeekOffDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        DataTable _dt;
        private readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;

        public List<Common_WeekOff> GetEmployeeWeekOff(long empId)
        {
            return _common.Select_Data_List<Common_WeekOff>("sp_Select_WeekOff", "Get_WeekOff_For_Employee", empId.ToString());
        }

        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public void Save(Common_WeekOff eWeekOff, User user)
        {
            InsertShift(eWeekOff, user);
        }
        private void InsertShift(Common_WeekOff ww, User user)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand("sp_Insert_WeekOff", _dbConn)
            {
                CommandType = CommandType.StoredProcedure
            };
            _cmd.Parameters.Add(new SqlParameter("@call_name", "InsertWeekOff"));
            _cmd.Parameters.Add(new SqlParameter("@EmpID", ww.EmpID));
            _cmd.Parameters.Add(new SqlParameter("@DayID", ww.DayID));
            _cmd.Parameters.Add(new SqlParameter("@StartDate", ww.StartDate.ToString("yyyy-MM-dd")));
            _cmd.Parameters.Add(new SqlParameter("@UserID", user.USERID));
            _cmd.Parameters.Add(new SqlParameter("@TerminalID", user.TermID));
            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
        }
    }
}
