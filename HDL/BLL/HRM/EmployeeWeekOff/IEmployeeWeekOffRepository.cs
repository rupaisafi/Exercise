using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.EmployeeWeekOff
{
    public interface IEmployeeWeekOffRepository
    {
        string Save(List<HumanResource_EmployeeBasic> objEmployee, DateTime objStartDate, List<Common_WeekOff> objWeekOff, User user);
        List<Common_WeekOff> GetEmployeeWeekOff(long empId);
    }
}
