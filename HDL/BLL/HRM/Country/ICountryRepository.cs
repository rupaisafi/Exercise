using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.Country
{
    public interface ICountryRepository
    {
        List<Common_Country> GetCountries();
        List<Common_Division> GetAllDivision();
        List<Common_District> GetAllDistrict(int divisionId);
        List<Common_Thana> GetAllThana(int districtId);
    }
}
