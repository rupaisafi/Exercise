using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.EmployeeWeekOff;
using Entities.HDL;
using Entities.HRM;

namespace HDLERP.Controllers.HRM
{
    public class EmployeeWeekOffController : Controller
    {
        readonly IEmployeeWeekOffRepository _employeeWeekOffRepository = new EmployeeWeekOffService();

        public ActionResult Save(List<HumanResource_EmployeeBasic> objEmployee, DateTime objStartDate, List<Common_WeekOff> objWeekOff)
        {
            var user = (User)Session["CurrentUser"];
            var res = _employeeWeekOffRepository.Save(objEmployee, objStartDate, objWeekOff, user);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeWeekOff(long empId)
        {

            var resuList = _employeeWeekOffRepository.GetEmployeeWeekOff(empId);
            var obj = new
            {
                Items = resuList,
                TotalCount = resuList.Count
            };
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

    }
}