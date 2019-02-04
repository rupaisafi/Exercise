using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HRM;

namespace DAL.HRM
{
    public class CountryDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_Country> GetCounties()
        {
            return _common.Select_Data_List<Common_Country>("sp_Select_Country", "Get_Country_For_Combo");
        }

        public List<Common_Division> GetAllDivision()
        {
            return _common.Select_Data_List<Common_Division>("sp_Select_Country", "Get_Division_For_Combo");
        }

        public List<Common_District> GetAllDistrict(int divisionId)
        {
            return _common.Select_Data_List<Common_District>("sp_Select_Country", "Get_District_For_Combo",divisionId.ToString());
        }

        public List<Common_Thana> GetAllThana(int districtId)
        {
            return _common.Select_Data_List<Common_Thana>("sp_Select_Country", "Get_Thana_For_Combo",districtId.ToString());
        }
    }
}
