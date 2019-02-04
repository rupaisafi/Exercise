using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.AttendanceProcess
{
    public interface IAttendanceProcessRepository
    {
        string Process(List<HumanResource_EmployeeBasic> objEmployee, ProcessDate objDate, User user);
    }
}
