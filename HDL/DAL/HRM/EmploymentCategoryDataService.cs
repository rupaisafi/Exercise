using DAL.Common;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HRM
{
    public class EmploymentCategoryDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public List<Common_EmploymentCategory> GetEmploymentCategories()
        {
            return _common.Select_Data_List<Common_EmploymentCategory>("sp_Select_EmploymentCategory", "Get_EmploymentCategory_For_Combo");
        }
    }
}
