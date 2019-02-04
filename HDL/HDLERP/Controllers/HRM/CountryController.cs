
using BLL.HRM.Country;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers.HRM
{
    public class CountryController : Controller
    {
        private readonly ICountryRepository _countryRepository = new CountryService();
        public JsonResult GetAll()
        {
            var resuList = _countryRepository.GetCountries();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDivision()
        {
            var resuList = _countryRepository.GetAllDivision();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDistrict(int divisionId)
        {
            var resuList = _countryRepository.GetAllDistrict(divisionId);
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllThana(int districtId)
        {
            var resuList = _countryRepository.GetAllThana(districtId);
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}