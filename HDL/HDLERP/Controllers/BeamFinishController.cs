using BLL.HDL.BeamFinish;
using BLL.HDL.CommonInfo;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class BeamFinishController : Controller
    {
        IBeamFinishRepository _repository = new BeamFinishRepository();
        private ICommonInfoRepository _commonRepository = new CommonInfoService();
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
            //return View();
        }
        public JsonResult GetAllUnit()
        {
            var result = _commonRepository.GetAllUnit();
            if (result != null)
            {
                var list = result
                    .Select(s => new
                    {
                        Id = s.UnitCode,
                        Text = s.UnitName
                    })
                    .ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllLoom(int uCode = 0)
        {
            var result = _commonRepository.GetAllMachine();
            if (result != null)
            {
                var list = result
                    .Where(w => w.UCode == uCode && w.GCode == 3)
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
        public JsonResult GetAllDyeingSetNo()
        {
            var result = _commonRepository.GetAllDyeingSetNo();
            if (result != null)
            {
                var list = result
                    .Select(s => new
                    {
                        Id = s.SetNo,
                        Text = s.SetNo
                    })
                    .ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDyeingSSNo(int setNo = 0)
        {
            var result = _commonRepository.GetAllDyeingSSNo(setNo.ToString());
            if (result != null)
            {
                var list = result
                    .Select(s => new
                    {
                        Id = s.SSNo,
                        Text = s.SSNo,
                        BeamNo = s.BeamNo
                    })
                    .ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetSummary(GridOptions options, string from, string to)
        {
            var res = _repository.GetSummary(options, from, to);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetails(string masterID)
        {
            var result = _repository.GetDetails(masterID);
            if (result != null)
            {
                var list = result.Select(e => new
                {
                    BIID = e.BIID,
                    BID = e.BID,
                    Loom = new
                    {
                        Id = e.MNo,
                        Text = e.Loom
                    },
                    SetNo = new
                    {
                        Id = e.SetNo,
                        Text = e.SetNo
                    },
                    SSNo = new
                    {
                        Id = e.SS,
                        Text = e.SS,
                    },
                    BeamNo = e.BeamNo,
                    Remarks = e.Remarks
                }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SaveBeamFinish(TblBeamFinish master)
        {
            var result = _repository.SaveBeamFinish(master);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveBeamFinishDetail(TblBeamFinishDetails detail)
        {
            var result = _repository.SaveBeamFinishDetail(detail);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}