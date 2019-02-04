using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HRM;

namespace DAL.HRM
{
    public class MaritalStatusDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_MaritalStatus> GetMaritalStatuses()
        {
            return _common.Select_Data_List<Common_MaritalStatus>("sp_Select_MaritalStatus", "Get_MaritalStatus_For_Combo");
        }
    }
}
