using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HRM.Section
{
    public interface ISectionRepository
    {
        string SaveSection(Common_Section objSection);
        GridEntity<Common_Section> GetSectionSummary(GridOptions options);
        List<Common_Section> GetAllSection();
        GridEntity<R_UnitDept> GetUnitDepartmentSummary(GridOptions options);
        GridEntity<R_DeptSection> GetSectionPermissionSummary(GridOptions options, string UDepID);
        string SaveSectionPermission(int UDepID, List<R_DeptSection> objUnitDepSectionList, List<R_DeptSection> objRemovedSectionList);
    }
}
