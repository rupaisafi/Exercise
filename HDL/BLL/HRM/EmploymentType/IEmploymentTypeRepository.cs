using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.EmploymentType
{
   public interface IEmploymentTypeRepository
   {
       List<Common_EmploymentType> GetEmploymentTypes();
   }
}
