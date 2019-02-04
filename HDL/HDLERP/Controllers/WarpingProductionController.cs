using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.WarpingProduction;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class WarpingProductionController : Controller
    {
        IWarpingProductionRepository _warpingProductionRepo = new WarpingProductionService();
        public ActionResult WarpingProductionInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public JsonResult GetWarpingSetNo()
        {
            var res = _warpingProductionRepo.GetWarpingSetNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInfoBySetNo(string setNo)
        {
            var res = _warpingProductionRepo.GetInfoBySetNo(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemBySetNo(string setNo)
        {
            var res = _warpingProductionRepo.GetItemBySetNo(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemBySetNoAndItem(string setNo,string icNo)
        {
            var res = _warpingProductionRepo.GetItemBySetNoAndItem(setNo, icNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLotNoByIName(string iName)
        {
            var res = _warpingProductionRepo.GetLotNoByIName(iName);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveWarpingProdInfo(WarpingProdInfo objWarp, List<WarpingProdDetails> objWarpDetails)
        {
            var user = (User)Session["CurrentUser"];
            objWarp.UserId = user.EMPID;
            objWarp.TermId = user.TermID;
            objWarp.EDate = DateTime.Now;
            var res = _warpingProductionRepo.SaveWarpingProdInfo(objWarp, objWarpDetails);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetWarpingProdSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _warpingProductionRepo.GetWarpingProdSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllGridData(string idNo)
        {
            var res = _warpingProductionRepo.GetAllGridData(idNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}