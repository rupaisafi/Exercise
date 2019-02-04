using DAL.Common;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HRM
{
    public class GenderDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();

        public List<Common_Gender> GetGenders()
        {
            return _common.Select_Data_List<Common_Gender>("sp_Select_Gender", "Get_Gender_For_Combo");
        }
    }
}
