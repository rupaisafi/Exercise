using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.Department;
using Entities.HRM;
using DBManager;

namespace HDLERP.Controllers.HRM
{
    public class DepartmentController : Controller
    {
        readonly IDepartmentRepository _departmentRepository = new DepartmentService();

        public ActionResult DepartmentSettings()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("../HRM/Department/DepartmentSettings");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }

        public ActionResult SaveDepartment(Common_Department objDepartment)
        {
            var res = _departmentRepository.SaveDepartment(objDepartment);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDepartmentSummary(GridOptions options)
        {
            var res = _departmentRepository.GetDepartmentSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAll()
        {
            var resuList = _departmentRepository.GetAllDepartment();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDepartmentPermissionSummary(GridOptions options, string UnitId)
        {
            var List = _departmentRepository.GetDepartmentPermissionSummary(options, UnitId);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveUnitDepartmentPermission(int UnitId,List<R_UnitDept> objUnitDepartmentList, List<R_UnitDept> objRemovedDepartmentList)
        {
            var res = _departmentRepository.SaveUnitDepartmentPermission(UnitId,objUnitDepartmentList, objRemovedDepartmentList);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}