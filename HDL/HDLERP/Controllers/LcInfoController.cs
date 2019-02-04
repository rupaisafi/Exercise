using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.LcInfo;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class LcInfoController : Controller
    {
        readonly ILcInfoRepository _lcInfoRepository = new LcInfoService();
        public ActionResult LcInfo()
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

        public ActionResult SaveLcInfo(ImpLcInfo objLc, List<ImpLcDetails> objLcDetails)
        {
            var user = (User)Session["CurrentUser"];
            objLc.UserId = user.EMPID;
            objLc.TermId = user.TermID;
            var res = _lcInfoRepository.SaveLcInfo(objLc, objLcDetails);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLcInfoSummary(GridOptions options)
        {
            var res = _lcInfoRepository.GetLcInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllGridData(string lcId)
        {
            var res = _lcInfoRepository.GetAllGridData(lcId);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}