using DAL.Common;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HRM
{
    public class ReligionDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public List<Common_Religion> GetReligions()
        {
            return _common.Select_Data_List<Common_Religion>("sp_Select_Religion", "Get_Religion_For_Combo");
        }
    }
}
