using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;

namespace BLL.HRM.AllowanceByDesGroup
{
    public interface IAllowanceByDesGroupRepository
    {
        string SaveAllowanceByDesGroup(Payroll_AllowanceByDesGroup objAllowanceByDesGroup);
        GridEntity<Payroll_AllowanceByDesGroup> GetAllowanceByDesGroupSummary(GridOptions options);
        List<Payroll_AllowanceByDesGroup> GetAllAllowanceByDesGroup();
    }
}
