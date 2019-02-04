using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.AttendanceProcess;
using Entities.HDL;

namespace HDLERP.Controllers.HRM
{
    public class AttendanceProcessController : Controller
    {
        private readonly IAttendanceProcessRepository _attendanceProcessRepository = new AttendanceProcessService();
        public ActionResult AttendanceProcess()
        {
            if (Session["CurrentUser"] != null)
                return View("../HRM/AttendanceProcess/AttendanceProcess");
            else
                return RedirectToAction("Logoff", "Home");
        }

        public ActionResult Process(List<HumanResource_EmployeeBasic> objEmployee, ProcessDate objDate)
        {
            var user = (User)Session["CurrentUser"];
            var res = _attendanceProcessRepository.Process(objEmployee, objDate, user);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}