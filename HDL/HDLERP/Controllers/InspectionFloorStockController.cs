using BLL.HDL.InspectionFloorStock;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class InspectionFloorStockController : Controller
    {
        IInspectionFloorStockRepository _repository = new InspectionFloorStockRepository();
        // GET: InspectionFloorStock
        public ActionResult Index()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("InspectionFloorStockInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        [HttpPost]
        public ActionResult SaveMasterInfo(InspectionFloorStockMaster objMaster)
        {
            var user = (User)Session["CurrentUser"];
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SaveDetailInfo(InspectionFloorStockDetail obj)
        {
            var user = (User)Session["CurrentUser"];
            var res = _repository.SaveDetailInfo(obj);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _repository.GetSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetailByID(string SID)
        {
            var res = _repository.GetDetailByID(SID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}