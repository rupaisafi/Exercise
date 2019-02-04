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
    public class EmployeeShiftDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        DataTable _dt;
        private readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_Shift> GetShifts()
        {
            return _common.Select_Data_List<Common_Shift>("sp_Select_Shift", "Get_Shift_For_Combo");
        }

        public void Save(Common_Shift ss, User user)
        {

            InsertShift(ss, user);
        }

        private void InsertShift(Common_Shift ss, User user)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand("sp_Insert_Shift", _dbConn)
            {
                CommandType = CommandType.StoredProcedure
            };
            _cmd.Parameters.Add(new SqlParameter("@call_name", "InsertShift"));
            _cmd.Parameters.Add(new SqlParameter("@EmpID", ss.EmpID));
            _cmd.Parameters.Add(new SqlParameter("@ShiftID", ss.ShiftID));
            _cmd.Parameters.Add(new SqlParameter("@StartDate", ss.StartDate.ToString("yyyy-MM-dd")));
            _cmd.Parameters.Add(new SqlParameter("@UserID", user.USERID));
            _cmd.Parameters.Add(new SqlParameter("@TerminalID", user.TermID));
            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
        }

        public List<Common_Shift> GetEmployeeShift(long empID)
        {
            return _common.Select_Data_List<Common_Shift>("sp_Select_Shift", "Get_Shift_For_Employee", empID.ToString());
        }
    }
}
