
using BLL.HDL.FinishingFloorStock;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class FinishingFloorStockController : Controller
    {
        IFloorStockRepository _repository = new FloorStockRepository();
        public ActionResult FinishingFloorStock()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("FinishingFloorStockInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public ActionResult SaveMasterInfo(FinishingStockMaster objMaster)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveRecInfo(FinishingStockRec objRec)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveRecInfo(objRec);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveDisInfo(FinishingStockDispatch objDis)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveDisInfo(objDis);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStockSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _repository.GetStockSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStockRec(int FID)
        {
            var res = _repository.GetStockRec(FID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStockDis(int FID)
        {
            var res = _repository.GetStockDis(FID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}