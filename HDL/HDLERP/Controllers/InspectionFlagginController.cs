using BLL.HDL.InspectionFlaggin;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class InspectionFlagginController : Controller
    {
        IInspectionFlagginRepository _repository = new InspectionFlagginRepository();
        // GET: InspectionFlaggin
        public ActionResult Index()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("InspectionFlagginInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public JsonResult GetDept()
        {
            var res = _repository.GetDept();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOperator()
        {
            var res = _repository.GetOperator();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPO()
        {
            var res = _repository.GetPO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetQuality()
        {
            var res = _repository.GetQuality();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveMasterInfo(InspFlagginMaster objMaster)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            objMaster.UserName = user.EMPID;
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveDetailInfo(InspFlagginDetail obj)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            obj.UserName = user.EMPID;
            var res = _repository.SaveDetailInfo(obj);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _repository.GetSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFlagginDetailByID(string SID)
        {
            var res = _repository.GetFlagginDetailByID(SID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}