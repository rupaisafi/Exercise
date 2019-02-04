using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Entities.HRM;
using System.Threading.Tasks;
using DBManager;

namespace BLL.HRM.Department
{
    public interface IDepartmentRepository
    {
        string SaveDepartment(Common_Department objDepartment);
        GridEntity<Common_Department> GetDepartmentSummary(GridOptions options);
        List<Common_Department> GetAllDepartment();
        GridEntity<R_UnitDept> GetDepartmentPermissionSummary(GridOptions options, string UnitId);
        string SaveUnitDepartmentPermission(int UnitId, List<R_UnitDept> objUnitDepartmentList, List<R_UnitDept> objRemovedDepartmentList);
    }
}
