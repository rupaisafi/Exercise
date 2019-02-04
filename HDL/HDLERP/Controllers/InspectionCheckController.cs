using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.InspectionCheck;

namespace HDLERP.Controllers
{
    public class InspectionCheckController : Controller
    {
        IInspectionCheckRepository _repository = new InspectionCheckRepository();
        public ActionResult Index()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("LogOff", "Home");
            }
        }
        public JsonResult GetAllInspectionCheckRejectionToFinish()
        {
            var res = _repository.GetAllInspectionCheckRejectionToFinish();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllInspectionCheckProductionToFinish()
        {
            var res = _repository.GetAllInspectionCheckProductionToFinish();
            return Json(res,JsonRequestBehavior.AllowGet);
        }
    }
}