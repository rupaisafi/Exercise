using DAL.Common;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HRM
{
    public class BloodGroupDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_BloodGroup> GetBloodGroups()
        {
            return _common.Select_Data_List<Common_BloodGroup>("sp_Select_BloodGroup", "Get_BloodGroup_For_Combo");
        }
    }
}
