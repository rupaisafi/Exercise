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
    public class TeamDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public string SaveTeam(Common_Team objTeam)
        {
            string rv = "";
            try
            {
                Insert_Update_Team("sp_Insert_Team", "saveTeaminfo", objTeam);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Team(string procedure, string callname, Common_Team objTeam)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_TeamId", objTeam.TeamID));
            cmd.Parameters.Add(new SqlParameter("@p_TeamName", objTeam.TeamName));
            cmd.Parameters.Add(new SqlParameter("@p_TeamNameBan", objTeam.TeamNameBan));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objTeam.IsActive));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Common_Team> GetTeamSummary(GridOptions options)
        {
            var Team = new GridEntity<Common_Team>();
            Team = KendoGrid<Common_Team>.GetGridData_5(options, "sp_Select_Team_Grid", "get_Team_summary", "TeamName");
            return Team;
        }

        public List<Common_Team> GetTeams()
        {
            return _common.Select_Data_List<Common_Team>("sp_Select_Team", "Get_Team_For_Combo");
        }

        public GridEntity<R_SecWing> GetSectionWingSummary(GridOptions options)
        {
            var Team = new GridEntity<R_SecWing>();
            Team = KendoGrid<R_SecWing>.GetGridData_5(options, "sp_Select_Unit_Department_Section_Team_Grid", "get_Unit_Department_Section_Wing_Summary", "SectionName");
            return Team;
        }

        public GridEntity<R_WingTeam> GetTeamPermissionSummary(GridOptions options, string SWingID)
        {
            return KendoGrid<R_WingTeam>.GetGridData(options, "sp_Select_Unit_Department_Section_Team_Grid", "get_Team_permission", "TeamName", 0, SWingID);
        }

        public string SaveTeamPermission(DataSet dsTeam, DataSet dsRemoveSec)
        {
            string rv = "";
            try
            {
                Insert_Update("SP_Insert_UnitDeptSectionWingTeamPermission", "Save_Permission", dsTeam, dsRemoveSec);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update(string procedure, string callname, DataSet rqdXmlv1 = null, DataSet rqdXmlv2 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();

            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add("@dsxmlu2", SqlDbType.Xml).Value = (rqdXmlv2 == null ? null : rqdXmlv2.GetXml());
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));

            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);

            dbConn.Close();
            return dt;
        }
    }
}
