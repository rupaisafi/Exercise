using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HRM;

namespace DAL.HRM
{
    public class EmploymentStatusDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_EmploymentStatus> GetEmploymentStatuses()
        {
            return _common.Select_Data_List<Common_EmploymentStatus>("sp_Select_EmploymentStatus", "Get_EmploymentStatus_For_Combo");
        }
    }
}
