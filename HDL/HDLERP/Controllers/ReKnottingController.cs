using BLL.HDL.CommonInfo;
using BLL.HDL.Knotting;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class ReKnottingController : Controller
    {
        IKnottingRepository _repository = new KnottingRepository();
        ICommonInfoRepository _commonRepository = new CommonInfoService();

        public ActionResult Index()
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
        //Select list
        public JsonResult GetAllDyeingSetNo()
        {
            var res = _commonRepository.GetAllDyeingSetNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLoom(int uCode = 0)
        {
            var res = new List<MachineEntity>();
            if (uCode > 0)
            {
                res = _commonRepository.GetAllMachine().Where(w => w.GCode == 3 && w.UnitCode == uCode).ToList();
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeingSSNo(int setNo = 0)
        {
            var res = new List<SSNoModel>();
            if (setNo > 0)
            {
                res = _commonRepository.GetAllDyeingSSNo(setNo.ToString());
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSummary(GridOptions options, string from, string to)
        {
            var res = _repository.GetSummary(options, from, to);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetail(GridOptions options, string masterID)
        {
            var res = _repository.GetDetail(options, masterID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveData(KnottingMaster master, KnottingDetail detail)
        {
            if (master != null)
            {
                master.TrackDate = null;
                detail.KDate = master.KDate;
            }
            var res = _repository.SaveData(master, detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}