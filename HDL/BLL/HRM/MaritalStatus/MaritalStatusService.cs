using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.MaritalStatus
{
    public class MaritalStatusService : IMaritalStatusRepository
    {
        private MaritalStatusDataService _dataService = new MaritalStatusDataService();
        public List<Common_MaritalStatus> GetMaritalStatuses()
        {
            return _dataService.GetMaritalStatuses();
        }
    }
}
