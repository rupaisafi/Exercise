using BLL.HDL.FinishingProduction;
using BLL.HDL.WeavingProduction;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class FinishingProductionController : Controller
    {
        // GET: FinishingProduction
        IWeavingRepository _Wrepository = new WeavingRepository();
        IFinishingRepository _repository = new FinishingRepository();
        public ActionResult FinishingProductionInfo()
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
        public JsonResult GetAllProductionSLNo( string setno)
        {
               var res = _repository.GetAllProductionSLNo(setno);
            
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFinishingLoomNo( string setNo, string SLNo)
        {
            var res = _repository.GetAllFinishingBeamNo(setNo, SLNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdType()
        {
            var res = _repository.GetAllProdType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFinishingOperator()
        {
            var res = _repository.GetFinishingOperator();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFinishingRoute()
        {
            var res = _repository.GetFinishingRoute();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SaveFinishingMasterInfo(FinisgingProductionMaster objMaster)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
           // objMaster.UName = user.EMPID;
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SaveFinishingDetailInfo(FinishingProductionDetail objDetail)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            //objDetail.UName = user.EMPID;
            var res = _repository.SaveDetailInfo(objDetail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _repository.GetProductionSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductionDetail(int FID)
        {
            var res = _repository.GetProductionDetail(FID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}