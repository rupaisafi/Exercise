using BLL.HRM.Section;
using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers.HRM
{
    public class SectionController : Controller
    {
        readonly ISectionRepository _sectionRepository = new SectionService();

        public ActionResult SectionSettings()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("../HRM/Section/SectionSettings");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }

        public ActionResult SaveSection(Common_Section objSection)
        {
            var res = _sectionRepository.SaveSection(objSection);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSectionSummary(GridOptions options)
        {
            var res = _sectionRepository.GetSectionSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAll()
        {
            var resuList = _sectionRepository.GetAllSection();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUnitDepartmentSummary(GridOptions options)
        {
            var List = _sectionRepository.GetUnitDepartmentSummary(options);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSectionPermissionSummary(GridOptions options, string UDepID)
        {
            var List = _sectionRepository.GetSectionPermissionSummary(options, UDepID);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveSectionPermission(int UDepID, List<R_DeptSection> objUnitDepSectionList, List<R_DeptSection> objRemovedSectionList)
        {
            var res = _sectionRepository.SaveSectionPermission(UDepID, objUnitDepSectionList, objRemovedSectionList);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}