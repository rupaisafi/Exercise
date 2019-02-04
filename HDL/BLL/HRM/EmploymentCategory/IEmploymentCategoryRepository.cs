using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.EmploymentCategory
{
    public interface IEmploymentCategoryRepository
    {
        List<Common_EmploymentCategory> GetEmploymentCategories();
    }
}
