using DAL.Common;
using DBManager;
using DBManager.StoreProcedureHRM;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL.HRM
{
    public class ShiftDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveShift(Common_Shift objShift)
        {
            string rv = "";
            try
            {
                Insert_Update_Shift("sp_Insert_Common_Shift", "saveShiftinfo", objShift);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Shift(string procedure, string callname, Common_Shift objShift)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftId", objShift.ShiftID));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftName", objShift.ShiftName));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftShort", objShift.ShiftShort));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftIn", objShift.MinDateChange(objShift.ShiftIn)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftLate", objShift.MinDateChange(objShift.ShiftLate)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftAbsent", objShift.MinDateChange(objShift.ShiftAbsent)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftEarly", objShift.MinDateChange(objShift.ShiftEarly)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftOut", objShift.MinDateChange(objShift.ShiftOut)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftLastPunch", objShift.MinDateChange(objShift.ShiftLastPunch)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftLunchFrom", objShift.MinDateChange(objShift.ShiftLunchFrom)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftLunchTill", objShift.MinDateChange(objShift.ShiftLunchTill)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftIfterFrom", objShift.MinDateChange(objShift.ShiftIfterFrom)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftIfterTill", objShift.MinDateChange(objShift.ShiftIfterTill)));
            cmd.Parameters.Add(new SqlParameter("@p_NightBreakFrom", objShift.MinDateChange(objShift.NightBreakFrom)));
            cmd.Parameters.Add(new SqlParameter("@p_NightBreakTill", objShift.MinDateChange(objShift.NightBreakTill)));
            cmd.Parameters.Add(new SqlParameter("@p_SheriBreakFrom ", objShift.MinDateChange(objShift.SheriBreakFrom)));
            cmd.Parameters.Add(new SqlParameter("@p_SheriBreakTill", objShift.MinDateChange(objShift.SheriBreakTill)));
            cmd.Parameters.Add(new SqlParameter("@p_IsLunch", objShift.IsLunch));
            cmd.Parameters.Add(new SqlParameter("@p_IsTiffin", objShift.IsTiffin));
            cmd.Parameters.Add(new SqlParameter("@p_TiffinTime", objShift.MinDateChange(objShift.TiffinTime)));
            cmd.Parameters.Add(new SqlParameter("@p_IsIfter", objShift.IsIfter));
            cmd.Parameters.Add(new SqlParameter("@p_IfterTime", objShift.MinDateChange(objShift.IfterTime)));
            cmd.Parameters.Add(new SqlParameter("@p_IsNight", objShift.IsNight));
            cmd.Parameters.Add(new SqlParameter("@p_NightTime", objShift.MinDateChange(objShift.NightTime)));
            cmd.Parameters.Add(new SqlParameter("@p_ShiftType", objShift.ShiftType));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Shift> GetShiftSummary(GridOptions options)
        {
            var Shift = new GridEntity<Common_Shift>();
            Shift = KendoGrid<Common_Shift>.GetGridData_5(options, "sp_Select_Shift_Grid", "get_Shift_summary", "ShiftName");
            return Shift;
        }

        public List<Common_Shift> GetAllShift()
        {
            return _common.Select_Data_List<Common_Shift>("sp_Select_Shift_Info", "get_All_Shift");
        }

        public List<Common_ShiftType> GetAllShiftType()
        {
            return _common.Select_Data_List<Common_ShiftType>("sp_Select_ShiftType", "");
        }
    }
}
