using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.EmoloyeeSeparation;
using Entities.HDL;
using Entities.HRM;

namespace HDLERP.Controllers.HRM
{
    public class EmployeeSeparetionController : Controller
    {
        readonly IEmployeeSeparetionRepository _employeeSeparetionRepository = new EmployeeSeparetionService();
        public ActionResult EmployeeSeperation()
        {
            if (Session["CurrentUser"] != null)
                return View("../HRM/EmployeeSeparetion/EmployeeSeparation");
            else
                return RedirectToAction("Logoff", "Home");
        }
        public ActionResult Save(HumanResource_EmployeeSeparation objSeparation)
        {
            var user = (User)Session["CurrentUser"];
            var res = _employeeSeparetionRepository.Save(objSeparation, user);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeSeparation(long empId)
        {
            var resuList = _employeeSeparetionRepository.GetEmployeeSeparation(empId);
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}