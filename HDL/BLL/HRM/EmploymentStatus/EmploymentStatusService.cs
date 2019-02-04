using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.EmploymentStatus
{
    public class EmploymentStatusService : IEmploymentStatusRepository
    {
        private EmploymentStatusDataService _dataService = new EmploymentStatusDataService();
        public List<Common_EmploymentStatus> GetEmploymentStatuses()
        {
            return _dataService.GetEmploymentStatuses();
        }
    }
}
