using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.BloodGroup
{
    public class BloodGroupService : IBloodGroupRepository
    {
        private BloodGroupDataService _dataService = new BloodGroupDataService();
        public List<Common_BloodGroup> GetBloodGroups()
        {
            return _dataService.GetBloodGroups();
        }
    }
}
