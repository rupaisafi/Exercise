using BLL.HDL.CommonInfo;
using BLL.HDL.LoomDownTime;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class LoomDownTimeController : Controller
    {
        private ILoomDownTimeRepository _repository = new LoomDownTimeRepository();
        private ICommonInfoRepository _commonRepository = new CommonInfoService();

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
        public JsonResult GetDetail(string masterID)
        {
            var result = _repository.GetDetail(masterID);
            if (result != null)
            {
                var list = result.Select(e => new
                {
                    ID = e.ID,
                    Loom = new
                    {
                        Id = e.LoomID,
                        Text = e.LoomName
                    },
                    Reason = new
                    {
                        Id = e.ReasonID,
                        Text = e.ReasonType
                    },
                    StopTime = e.StopTime,
                    RunTime = e.RunTime,
                    TotalTime = e.TotalTime,
                    Remarks = e.Remark,

                }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetSummary(GridOptions options, string from, string to)
        {
            var res = _repository.GetSummaryData(options, from, to);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllReason()
        {
            var result = _commonRepository.GetAllType();
            if (result != null)
            {
                var list = result
                    .Select(s => new
                    {
                        Id = s.TCode,
                        Text = s.Type
                    })
                    .ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllLoom(int uCode = 1)
        {
            var result = _commonRepository.GetAllMachine().Where(w => w.GCode == 3 && w.UnitCode == uCode);
            if (result != null)
            {
                var list = result
                    .Select(s => new
                    {
                        Id = s.MNo,
                        Text = s.MName
                    })
                    .ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SaveLoomDownTimeMaster(LoomDownTimeMaster master)
        {
            var res = _repository.SaveLoomDownTimeMaster(master);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveLoomDownTimeDetail(LoomDownTimeDetail detail)
        {
            var res = _repository.SaveLoomDownTimeDetail(detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}