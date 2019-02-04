using System;
using System.Web;
using System.Linq;


using DBManager;
using Entities.HDL;
using System.Web.Mvc;
using BLL.HDL.DyeingProduction;
using System.Collections.Generic;


namespace HDLERP.Controllers
{
    public class DyeingProductionController : Controller
    {
        IDyeingProductionRepository _dyeingProductionRepo = new DyeingProductionService();
        public ActionResult DyeingProductionInfo()
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
        public JsonResult GetInfoBySetNo(string setNo)
        {
            var res = _dyeingProductionRepo.GetInfoBySetNo(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }        
        public JsonResult GetAllDyeRopeGridData(int dID)
        {
            var res = _dyeingProductionRepo.GetAllDyeRopeGridData(dID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLCBRopeGridData(int dID)
        {
            var res = _dyeingProductionRepo.GetAllLCBRopeGridData(dID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSizingGridData(int dID)
        {
            var res = _dyeingProductionRepo.GetAllSizingGridData(dID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInfoByStyleCode(string styleCode)
        {
            var res = _dyeingProductionRepo.GetInfoByStyleCode(styleCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeingProdSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _dyeingProductionRepo.GetDyeingProdSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveDyeingProdInfo(DyeingProdInfo prodInfo, List<DyeingProdDetailsDyeRope> dyeRopes, List<DyeingProdDetailsLCBRope> lCBRopes, List<DyeingProdDetailsSizingSlasherRope> sizingSlasherRopes)
        {
            var user = (User)Session["CurrentUser"];
            prodInfo.UserId = user.EMPID;
            prodInfo.TermId = user.TermID;
            prodInfo.EDate = DateTime.Now;
            var res = _dyeingProductionRepo.SaveDyeingProdInfo(prodInfo, dyeRopes, lCBRopes, sizingSlasherRopes);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}