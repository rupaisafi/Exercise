using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.MrrInfo;
using DBManager;
using Entities.HDL;
using Entities.HDL.DTO;

namespace HDLERP.Controllers
{
    public class MReceiveController : Controller
    {
        readonly static private IMrrInfoRepository _mrrInfoRepository = new MrrInfoService();
        public ActionResult MrrInfo()
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

        public JsonResult GetLcInfoByLcNo(string lcNo)
        {
            var res = _mrrInfoRepository.GetLcInfoByLcNo(lcNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemByLcNo(string lcNo)
        {
            var res = _mrrInfoRepository.GetItemByLcNo(lcNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMrrBalanceSummary(GridOptions options, string lcNo)
        {
            var res = _mrrInfoRepository.GetMrrBalanceSummary(options, lcNo);

            var obj = new
            {
                Items = res,
                TotalCount = res.Count
            };

            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveMrrInfo(MrrInformation objMrr, List<MrrDetails> objMrrDetails)
        {
            var user = (User)Session["CurrentUser"];
            objMrr.UserId = user.EMPID;
            objMrr.TermId = user.TermID;
            var res = _mrrInfoRepository.SaveMrrInfo(objMrr, objMrrDetails);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMrrInfoSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _mrrInfoRepository.GetMrrInfoSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllGridData(string mrrId)
        {
            var res = _mrrInfoRepository.GetAllGridData(mrrId);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }

}