using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.EmploymentType;
using BLL.HRM.Gender;

namespace HDLERP.Controllers.HRM
{
    public class GenderController : Controller
    {
        private readonly IGenderRepository _genderRepository = new GenderService();
        public JsonResult GetAll()
        {
            var resuList = _genderRepository.GetGenders();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}