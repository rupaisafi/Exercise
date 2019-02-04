using BLL.HDL.InspectionNonDispatch;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace HDLERP.Controllers
{
    public class InspectionNonDispatchController : Controller
    {
        IInspectionNonDispatchRepository _repository = new InspectionNonDispatchRepository();
        // GET: InspectionNonDispatch
        public ActionResult Index()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("InspectionNonDispatchInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public JsonResult GetPlanningSetNo()
        {
            var res = _repository.GetPlanningSetNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeingFault()
        {
            var res = _repository.GetDyeingFault();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPO()
        {
            var res = _repository.GetPO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDept()
        {
            var res = _repository.GetDept();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveMasterInfo(InspNonDispatchMaster objMaster)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            //objMaster.UserName = user.EMPID;
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveDetailInfo(InspNonDispatchDetail obj)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
           // obj.UserName = user.EMPID;
            var res = _repository.SaveDetailInfo(obj);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _repository.GetSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetailByID(string NID)
        {
            var res = _repository.GetDetailByID(NID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}

