using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.MaritalStatus
{
    public interface IMaritalStatusRepository
    {
        List<Common_MaritalStatus> GetMaritalStatuses();
    }
}
