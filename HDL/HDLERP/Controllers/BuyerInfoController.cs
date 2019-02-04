using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.BuyerInfo;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class BuyerInfoController : Controller
    {
        readonly IBuyerInfoRepository _buyerInfoRepository = new BuyerInfoService();
        public ActionResult BuyerInfo()
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
        public ActionResult SaveBuyerInfo(Buyer objBuyer)
        {
            var user = (User)Session["CurrentUser"];
            objBuyer.UserId = user.EMPID;
            objBuyer.TermId = user.TermID;
            var res = _buyerInfoRepository.SaveBuyerInfo(objBuyer);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBuyerInfoSummary(GridOptions options)
        {
            var res = _buyerInfoRepository.GetBuyerInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllBuyer()
        {
            var res = _buyerInfoRepository.GetAllBuyer();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GenerateMaxBuyerCode()
        {
            var res = _buyerInfoRepository.GenerateMaxBuyerCode();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}