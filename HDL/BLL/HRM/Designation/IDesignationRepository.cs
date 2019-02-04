using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;
using DBManager;

namespace BLL.HRM.Designation
{
    public interface IDesignationRepository
    {
        string SaveDesignation(Common_Designation objDesignation);
        GridEntity<Common_Designation> GetDesignationSummary(GridOptions options);
        List<Common_Designation> GetDesignations();
        List<Common_DesignationGroup> GetAllDesignationGroup();
        GridEntity<R_DeptDesignation> GetDesignationPermissionSummary(GridOptions options, string UDepID);
        string SaveDesignationPermission(int UDepID, List<R_DeptDesignation> objUnitDepSectionList, List<R_DeptDesignation> objRemovedSectionList);
    }
}
