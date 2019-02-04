using System.Web.Mvc;
using BLL.HRM.Unit;
using Entities.HRM;
using DBManager;
using DBManager.StoreProcedureHRM;
using System.Collections.Generic;
using BLL.HRM.Company;

namespace HDLERP.Controllers.HRM
{
    public class UnitController : Controller
    {
        readonly IUnitRepository _unitRepository = new UnitService();

        public ActionResult UnitInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("../HRM/Unit/UnitInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }

        public ActionResult SaveUnit(Common_Unit objUnit)
        {
            var res = _unitRepository.SaveUnit(objUnit);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUnitSummary(GridOptions options)
        {
            var res = _unitRepository.GetUnitSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAll()
        {
            var res = _unitRepository.GetAllUnit();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}