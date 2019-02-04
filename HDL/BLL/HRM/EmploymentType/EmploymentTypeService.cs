using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.EmploymentType
{
    public class EmploymentTypeService : IEmploymentTypeRepository
    {
        private readonly EmploymentTypeDataService _dataService = new EmploymentTypeDataService();
        public List<Common_EmploymentType> GetEmploymentTypes()
        {
            return _dataService.GetEmploymentTypes();
        }
    }
}
