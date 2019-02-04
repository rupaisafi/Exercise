using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HRM.Team
{
    public interface ITeamRepository
    {
        string SaveTeam(Common_Team objTeam);
        GridEntity<Common_Team> GetTeamSummary(GridOptions options);
        List<Common_Team> GetAllTeam();
        GridEntity<R_SecWing> GetSectionWingSummary(GridOptions options);
        GridEntity<R_WingTeam> GetTeamPermissionSummary(GridOptions options, string SWingID);
        string SaveTeamPermission(int SWingID, List<R_WingTeam> objUnitDepTeamList, List<R_WingTeam> objRemovedTeamList);
    }
}
