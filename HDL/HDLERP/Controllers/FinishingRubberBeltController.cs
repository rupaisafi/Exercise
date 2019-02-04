using BLL.HDL.FinishingRubberBelt;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace HDLERP.Controllers
{
    public class FinishingRubberBeltController : Controller
    {
        IFinishingRubberBelt _repository = new FinishingRubberBelt();
        // GET: FinishingRubberBelt
        public ActionResult FinishingRubberBelt()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("FinishingRubberBeltInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public JsonResult GetBeltType()
        {
            var res = _repository.GetBeltType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SaveMasterInfo(RubberBelt objMaster)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SaveDetailInfo(RubberBeltDetail objDetail)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveDetailInfo(objDetail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _repository.GetProductionSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetailByID(int RID)
        {
            var res = _repository.GetDetailByID(RID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}