using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.EmploymentStatus;

namespace HDLERP.Controllers.HRM
{
    public class EmploymentStatusController : Controller
    {
        private readonly IEmploymentStatusRepository _employmentStatus = new EmploymentStatusService();
        public JsonResult GetAll()
        {
            var resuList = _employmentStatus.GetEmploymentStatuses();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}