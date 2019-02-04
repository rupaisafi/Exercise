using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HRM;

namespace DAL.HRM
{
    public class EmploymentTypeDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_EmploymentType> GetEmploymentTypes()
        {
            return _common.Select_Data_List<Common_EmploymentType>("sp_Select_EmploymentType", "Get_EmploymentType_For_Combo");
        }
    }
}
