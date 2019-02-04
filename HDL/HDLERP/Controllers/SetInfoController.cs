using BLL.HDL.SetInfo;
using DBManager;
using Entities.HDL;
using System;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class SetInfoController : Controller
    {
        private readonly ISetInfoRepository _setInfoRepository = new SetInfoService();
        public ActionResult SetInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }
        public ActionResult SaveSetInfo(SetInfoEntity setInfoEntity)
        {
            var user = (User)Session["CurrentUser"];
            setInfoEntity.UserName = user.EMPID;
            setInfoEntity.EditDate = DateTime.Now;

            var res = _setInfoRepository.SaveSetInfo(setInfoEntity);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSetInfoSummary(GridOptions options)
        {
            var res = _setInfoRepository.GetSetInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllSet()
        {
            var res = _setInfoRepository.GetAllSetInfo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllProductionType()
        {
            var res = _setInfoRepository.GetAllProductionType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSetStatus()
        {
            var res = _setInfoRepository.GetAllSetStatus();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}