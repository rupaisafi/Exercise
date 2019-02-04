using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.EmploymentStatus
{
    public interface IEmploymentStatusRepository
    {
        List<Common_EmploymentStatus> GetEmploymentStatuses();
    }
}
