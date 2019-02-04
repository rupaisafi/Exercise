using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;
using System.Data;
using DBManager;

namespace BLL.HRM.Team
{
    public class TeamService : ITeamRepository
    {
        readonly TeamDataService _dataService = new TeamDataService();

        public string SaveTeam(Common_Team objTeam)
        {
            return _dataService.SaveTeam(objTeam);
        }

        public GridEntity<Common_Team> GetTeamSummary(GridOptions options)
        {
            return _dataService.GetTeamSummary(options); 
        }

        public List<Common_Team> GetAllTeam()
        {
            return _dataService.GetTeams();
        }

        public GridEntity<R_SecWing> GetSectionWingSummary(GridOptions options)
        {
            return _dataService.GetSectionWingSummary(options);
        }

        public GridEntity<R_WingTeam> GetTeamPermissionSummary(GridOptions options, string SWingID)
        {
            return _dataService.GetTeamPermissionSummary(options, SWingID);
        }

        public string SaveTeamPermission(int SWingID, List<R_WingTeam> objUnitDepTeamList, List<R_WingTeam> objRemovedTeamList)
        {
            var UnitDepTeam_dt = new DataTable();
            UnitDepTeam_dt.Columns.Add("WTeamID");
            UnitDepTeam_dt.Columns.Add("SWingID");
            UnitDepTeam_dt.Columns.Add("TeamID");

            if (objUnitDepTeamList != null)
                foreach (var objUnitDepTeam in objUnitDepTeamList)
                {
                    DataRow row1;
                    row1 = UnitDepTeam_dt.NewRow();
                    row1["WTeamID"] = objUnitDepTeam.WTeamID;
                    row1["SWingID"] = SWingID;
                    row1["TeamID"] = objUnitDepTeam.TeamID;
                    UnitDepTeam_dt.Rows.Add(row1);
                }
            UnitDepTeam_dt.TableName = "tblTeam";
            DataSet dsTeam = new DataSet("dsTeam");
            dsTeam.Tables.Add(UnitDepTeam_dt);

            //RemoveTeam
            var removeSec_dt = new DataTable();
            removeSec_dt.Columns.Add("WTeamID");
            removeSec_dt.Columns.Add("SWingID");
            removeSec_dt.Columns.Add("TeamID");
            if (objRemovedTeamList != null)
                foreach (var objRemoveTeam in objRemovedTeamList)
                {
                    DataRow row1;
                    row1 = removeSec_dt.NewRow();
                    row1["WTeamID"] = objRemoveTeam.WTeamID;
                    row1["SWingID"] = SWingID;
                    row1["TeamID"] = objRemoveTeam.TeamID;
                    removeSec_dt.Rows.Add(row1);
                }
            removeSec_dt.TableName = "tblRemoveTeam";
            DataSet dsRemoveSec = new DataSet("dsRemoveTeam");
            dsRemoveSec.Tables.Add(removeSec_dt);

            return _dataService.SaveTeamPermission(dsTeam, dsRemoveSec);
        }
    }
}
