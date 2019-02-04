using BLL.HDL.FabRejRefin;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class FabRejRefinController : Controller
    {
        IFabRejRefinRepository _repository = new FabRejRefinRepository();
        // GET: FabRejRefin
        public ActionResult Index()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("FabRejRefinInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public JsonResult GetAllMachine()
        {
            var res = _repository.GetAllMachine();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFTYPE()
        {
            var res = _repository.GetFTYPE();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeInfo()
        {
            var res = _repository.GetDyeInfo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetTCode()
        {
            var res = _repository.GetTCode();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFTYPERefinish()
        {
            var res = _repository.GetFTYPERefinish();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllPO()
        {
            var res = _repository.GetAllPO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllChqDCode()
        {
            var res = _repository.GetAllChqDCode();
            return Json(res, JsonRequestBehavior.AllowGet);
        }


        //save 
        public ActionResult SaveMasterInfo(InspRejectionMaster objMaster)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            objMaster.UserName = user.EMPID;
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveRecInfo(InspRejectionDetail objRec)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            objRec.UserName = user.EMPID;
            var res = _repository.SaveRecInfo(objRec);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveReFinishInfo(InspRefinishDetail objRe)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            //objRec.UserName = user.EMPID;
            var res = _repository.SaveReFinishInfo(objRe);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _repository.GetSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRejectionByID(string SID)
        {
            var res = _repository.GetRejectionByID(SID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRefinishByID(string SID)
        {
            var res = _repository.GetRefinishByID(SID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}