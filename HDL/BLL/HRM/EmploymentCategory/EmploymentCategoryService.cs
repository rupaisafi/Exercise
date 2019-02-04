using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.EmploymentCategory
{
    public class EmploymentCategoryService : IEmploymentCategoryRepository
    {
        private EmploymentCategoryDataService _dataService = new EmploymentCategoryDataService();
        public List<Common_EmploymentCategory> GetEmploymentCategories()
        {
            return _dataService.GetEmploymentCategories();
        }
    }
}
