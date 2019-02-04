using BLL.HDL.BeamStock;
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
    public class BeamStockController : Controller
    {
        IBeamStockRepository _repository = new BeamStockRepository();
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
        public JsonResult GetAllSetNo()
        {
            var result = _repository.GetAllSetNo();
            if (result != null)
            {
                var list = result
                    .Select(s => new
                    {
                        Id = s.P01,
                        Text = s.P01,
                        StyleNo = s.P02,
                        StyleCode = s.P10,
                        DyeDate = s.P03,
                        StockDays = s.P04,
                        PType = s.P05,
                        PTCode = s.P06,
                        YarnCounts = s.P07,
                        GConstruction = s.P08,
                        CurrentDate = s.P09
                    })
                    .ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDepartment()
        {
            var result = _repository.GetAllDepartment();
            if (result != null)
            {
                var list = result
                    .Select(s => new
                    {
                        Id = s.DID,
                        Text = s.DName
                    })
                    .ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllProductionType()
        {
            var res = _repository.GetAllProductionType();
            if (res != null)
            {
                var result = res.Select(s => new { Id = s.TCode, Text = s.Type });
                return Json(result, JsonRequestBehavior.AllowGet);
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

        public JsonResult GetDetails(string masterID)
        {
            var result = _repository.GetDetails(masterID);
            if (result != null)
            {
                var list = result.Select(e => new
                {
                    BIID = e.BIID,
                    BID = e.BID,
                    SetNo = new
                    {
                        Id = e.SetNo,
                        Text = e.SetNo,
                    },
                    SSNo = new
                    {
                        Id = e.SS,
                        Text = e.SS,
                    },
                    BeamNo = e.BeamNo,
                    StockDays = e.StockDays,
                    PDate = e.PDate.Value.ToString("dd/MM/yyyy"),
                    PType = new
                    {
                        Id = e.PCode,
                        Text = e.PType
                    },
                    StyleNo = new
                    {
                        Id = e.StyleNo,
                        Text = e.StyleCode
                    },
                    Remarks = e.Remarks,

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
            var res = _repository.GetSummary(options, from, to);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveBeamStock(TblBeamStock master)
        {
            var result = _repository.SaveBeamStock(master);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveBeamStockDetail(TblBeamStockDetails detail)
        {
            var result = _repository.SaveBeamStockDetail(detail);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}