using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.MaritalStatus;

namespace HDLERP.Controllers.HRM
{
    public class MaritalStatusController : Controller
    {
        private readonly IMaritalStatusRepository _maritalStatusRepository = new MaritalStatusService();
        public JsonResult GetAll()
        {
            var resuList = _maritalStatusRepository.GetMaritalStatuses();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}