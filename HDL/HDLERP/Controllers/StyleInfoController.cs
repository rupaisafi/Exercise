using BLL.HDL.StyleInfo;
using DBManager;
using Entities.HDL;
using System;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class StyleInfoController : Controller
    {
        readonly IStyleInfoRepository _styleInfoRepository = new StyleInfoService();
        public ActionResult StyleInfo()
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
        public ActionResult SaveStyleInfo(Style objStyle, StyleParamFinish objFinParam, StyleParamGrey objGreyParam, StyleParamFabric objFabParam)
        {
            //int ucode;
            var user = (User)Session["CurrentUser"];
            objStyle.UserId = user.EMPID;
            objStyle.TermId = user.TermID;
            objStyle.EntryDate = DateTime.Now;

            var res = _styleInfoRepository.SaveStyleInfo(objStyle, objFinParam, objGreyParam, objFabParam);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStyleInfoSummary(GridOptions options, string dateFrom, string dateTo, string styleNo)
        {
            var res = _styleInfoRepository.GetStyleInfoSummary(options, dateFrom, dateTo, styleNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllStyle()
        {
            var res = _styleInfoRepository.GetAllStyle();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GenerateMaxStyleCode()
        {
            var res = _styleInfoRepository.GenerateMaxStyleCode();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}