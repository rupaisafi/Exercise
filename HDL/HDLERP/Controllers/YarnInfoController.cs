using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.YarnInfo;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class YarnInfoController : Controller
    {
        readonly IYarnInfoRepository _yarnInfoRepository =new YarnInfoService();
        public ActionResult YarnInfo()
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

        public ActionResult SaveYarnInfo(Yarn objYarn)
        {
            var user = (User)Session["CurrentUser"];
            objYarn.UserId = user.EMPID;
            objYarn.TermId = user.TermID;
            var res = _yarnInfoRepository.SaveYarnInfo(objYarn);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetYarnInfoSummary(GridOptions options)
        {
            var res = _yarnInfoRepository.GetYarnInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllYarn()
        {
            var res = _yarnInfoRepository.GetAllYarn();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}