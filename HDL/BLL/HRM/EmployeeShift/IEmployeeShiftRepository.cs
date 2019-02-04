using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.EmployeeShift
{
    public interface IEmployeeShiftRepository
    {
        List<Common_Shift> GetShifts();
        string Save(List<HumanResource_EmployeeBasic> objEmployee, Common_Shift objShift, User user);
        List<Common_Shift> GetEmployeeShift(long empID);
    }
}
