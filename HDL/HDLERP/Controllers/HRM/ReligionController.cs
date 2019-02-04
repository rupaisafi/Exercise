using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.Religion;

namespace HDLERP.Controllers.HRM
{
    public class ReligionController : Controller
    {
        private readonly IReligionRepository _religionRepository = new ReligionService();
        public JsonResult GetAll()
        {
            var resuList = _religionRepository.GetReligions();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}