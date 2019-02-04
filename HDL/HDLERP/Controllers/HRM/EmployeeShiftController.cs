using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.EmployeeShift;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace HDLERP.Controllers.HRM
{
    public class EmployeeShiftController : Controller
    {
        readonly IEmployeeShiftRepository _employeeShiftRepository = new EmployeeShiftService();

        public ActionResult EmployeeShift()
        {
            if (Session["CurrentUser"] != null)
                return View("../HRM/EmployeeShift/EmployeeShift");
            else
                return RedirectToAction("Logoff", "Home");
        }
        public JsonResult GetAll()
        {
            var resuList = _employeeShiftRepository.GetShifts();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeShift(long empId)
        {
            
            var resuList = _employeeShiftRepository.GetEmployeeShift(empId);
            var obj = new
            {
                Items=resuList,
                TotalCount= resuList.Count
            };
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Save(List<HumanResource_EmployeeBasic> objEmployee, Common_Shift objShift)
        {
            var user = (User)Session["CurrentUser"];
            var res = _employeeShiftRepository.Save(objEmployee, objShift, user);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}