using BLL.HRM.Designation;
using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers.HRM
{
    public class DesignationController : Controller
    {
        readonly IDesignationRepository _designationRepository = new DesignationService();

        public ActionResult DesignationSettings()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("../HRM/Designation/DesignationSettings");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }

        public ActionResult SaveDesignation(Common_Designation objDesignation)
        {
            var res = _designationRepository.SaveDesignation(objDesignation);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDesignationSummary(GridOptions options)
        {
            var res = _designationRepository.GetDesignationSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAll()
        {
            var resuList = _designationRepository.GetDesignations();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllDesignationGroup()
        {
            var resuList = _designationRepository.GetAllDesignationGroup();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDesignationPermissionSummary(GridOptions options, string UDepID)
        {
            var List = _designationRepository.GetDesignationPermissionSummary(options, UDepID);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveDesignationPermission(int UDepID, List<R_DeptDesignation> objDepDesignationList, List<R_DeptDesignation> objRemovedDesignationList)
        {
            var res = _designationRepository.SaveDesignationPermission(UDepID, objDepDesignationList, objRemovedDesignationList);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}