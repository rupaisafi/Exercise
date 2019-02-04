using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.EmoloyeeSeparation
{
    public interface IEmployeeSeparetionRepository
    {
        string Save(HumanResource_EmployeeSeparation objSeparation, User user);
        HumanResource_EmployeeSeparation GetEmployeeSeparation(long empId);
    }
}
