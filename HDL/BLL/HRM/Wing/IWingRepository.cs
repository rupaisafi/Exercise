using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HRM.Wing
{
   public interface IWingRepository
   {
        string SaveWing(Common_Wing objWing);
        GridEntity<Common_Wing> GetWingSummary(GridOptions options);
        List<Common_Wing> GetAllWing();
        GridEntity<R_DeptSection> GetDeptSectionSummary(GridOptions options);
        GridEntity<R_SecWing> GetWingPermissionSummary(GridOptions options, string DSecID);
        string SaveWingPermission(int DSecID, List<R_SecWing> objUnitDepWingList, List<R_SecWing> objRemovedWingList);
    }
}
