using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.Country
{
    public class CountryService : ICountryRepository
    {
        readonly CountryDataService _dataService = new CountryDataService();
        public List<Common_Country> GetCountries()
        {
            return _dataService.GetCounties();
        }

        public List<Common_Division> GetAllDivision()
        {
            return _dataService.GetAllDivision();
        }

        public List<Common_District> GetAllDistrict(int divisionId)
        {
            return _dataService.GetAllDistrict(divisionId);
        }

        public List<Common_Thana> GetAllThana(int districtId)
        {
            return _dataService.GetAllThana(districtId);
        }
    }
}
