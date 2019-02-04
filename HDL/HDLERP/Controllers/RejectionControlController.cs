using BLL.HDL.CommonInfo;
using BLL.HDL.RejectionControl;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class RejectionControlController : Controller
    {
        IRejectionControlRepository _repository = new RejectionControlRepository();
        ICommonInfoRepository _commonRepository = new CommonInfoService();
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
        public JsonResult GetSummary(GridOptions options, string fromDate, string toDate)
        {
            var res = _repository.GetSummary(options, fromDate, toDate);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllShift()
        {
            var res = _commonRepository.GetShiftData();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.ShiftNo,
                    Text = s.Shift
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLoom()
        {
            var res = _commonRepository.GetAllMachine();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.MNo,
                    Text = s.MName
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWarpingFaultType()
        {
            var res = _repository.GetAllFaultType();
            if (res != null)
            {
                var result = res.Where(w => w.DCode == 1).Select(s => new
                {
                    Id = s.FCode,
                    Text = s.Falt
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeingFaultType()
        {
            var res = _repository.GetAllFaultType();
            if (res != null)
            {
                var result = res.Where(w => w.DCode == 2).Select(s => new
                {
                    Id = s.FCode,
                    Text = s.Falt
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingFaultType()
        {
            var res = _repository.GetAllFaultType();
            if (res != null)
            {
                var result = res.Where(w => w.DCode == 3).Select(s => new
                {
                    Id = s.FCode,
                    Text = s.Falt
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllFinishingFaultType()
        {
            var res = _repository.GetAllFaultType();
            if (res != null)
            {
                var result = res.Where(w => w.DCode == 4).Select(s => new
                {
                    Id = s.FCode,
                    Text = s.Falt
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeStopRopeFaultType()
        {
            var res = _repository.GetAllFaultType();
            if (res != null)
            {
                var result = res.Where(w => w.DCode == 2 && w.FCode == 2).Select(s => new
                {
                    Id = s.FCode,
                    Text = s.Falt
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllOperator(string setNo)
        {
            var res = _repository.GetAllOperator(setNo);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCaptain(string setNo)
        {
            var res = _repository.GetAllCaptain(setNo);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllDyeingPO()
        {
            var res = _repository.GetAllDyeingPO();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeingSizer()
        {
            var res = _repository.GetAllDyeingSizer();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeingCaptain()
        {
            var res = _repository.GetAllDyeingCaptain();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CaptainCode,
                    Text = s.CaptainName
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeingOP(string setNo, string ssNo)
        {
            var res = _repository.GetAllDyeingOP(setNo, ssNo);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllWeavingOP(string loomName, string weaveDate, string shiftCode)
        {
            var res = _repository.GetAllWeavingOP(loomName, weaveDate, shiftCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingPO(string loomName, string weaveDate, string shiftCode)
        {
            var res = _repository.GetAllWeavingPO(loomName, weaveDate, shiftCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingLineman(string loomName, string weaveDate, string shiftCode)
        {
            var res = _repository.GetAllWeavingLineman(loomName, weaveDate, shiftCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingFitter(string loomName, string weaveDate, string shiftCode)
        {
            var res = _repository.GetAllWeavingFitter(loomName, weaveDate, shiftCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingCaptain(string loomName, string weaveDate, string shiftCode)
        {
            var res = _repository.GetAllWeavingCaptain(loomName, weaveDate, shiftCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingInFitter(string loomName, string weaveDate, string shiftCode)
        {
            var res = _repository.GetAllWeavingInFitter(loomName, weaveDate, shiftCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllDyeStopRopeOperator(string setNo)
        {
            var res = _repository.GetAllDyeStopRopeOperator(setNo);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeStopRopeCaptain(string setNo)
        {
            var res = _repository.GetAllDyeStopRopeCaptain(setNo);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllFinishingMC()
        {
            var res = _repository.GetAllFinishingMC();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.MNo,
                    Text = s.MName
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllFinishingOperator(string setNo)
        {
            var res = _repository.GetAllFinishingOperator(setNo);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllFinishingCaptain(string setNo)
        {
            var res = _repository.GetAllFinishingCaptain(setNo);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWarpingDetail(string masterID)
        {
            var res = _repository.GetWarpingDetail(masterID);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    DID = s.DID,
                    ID = s.ID,
                    StyleNo = new { Id = s.StyleCode, Text = s.StyleNo },
                    SetNo = s.SetNo,
                    SS = s.SS,
                    Beam = s.Beam,
                    Loom = new { Id = s.MNo, Text = s.Loom },
                    FType = new { Id = s.FCode, Text = s.FType },
                    OName = new { Id = s.OCode, Text = s.OName },
                    Captain = new { Id = s.CaptainCode, Text = s.CaptainName },
                    OPNo = s.OPNo,
                    WarpTotalQnty = s.WarpTotalQnty,
                    ProdB = s.ProdB,
                    ProdC = s.ProdC,
                    ProdG = s.ProdG,
                    CutPieece = s.CutPieece,
                    Wastage = s.Wastage,
                    Remarks = s.Remarks
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeingDetail(string masterID)
        {
            var res = _repository.GetDyeingDetail(masterID);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    DID = s.DID,
                    ID = s.ID,
                    StyleNo = new { Id = s.StyleCode, Text = s.StyleNo },
                    SetNo = s.SetNo,
                    SS = s.SS,
                    Beam = s.Beam,
                    Loom = new { Id = s.MNo, Text = s.Loom },
                    FType = new { Id = s.FCode, Text = s.FType },
                    ProdB = s.ProdB,
                    ProdC = s.ProdC,
                    CutPieece = s.CutPieece,
                    Wastage = s.Wastage,
                    Shift = new { Id = s.ShiftCode, Text = s.ShiftName },
                    OName = new { Id = s.OCode, Text = s.OName },
                    PO = new { Id = s.POCode, Text = s.POName },
                    Sizer = new { Id = s.SzCode, Text = s.SzName },
                    Captain = new { Id = s.CaptainCode, Text = s.CaptainName },
                    Remarks = s.Remarks
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetWeavingDetail(string masterID)
        {
            var res = _repository.GetWeavingDetail(masterID);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    DID = s.DID,
                    ID = s.ID,
                    StyleNo = new { Id = s.StyleCode, Text = s.StyleNo },
                    SetNo = s.SetNo,
                    SS = s.SS,
                    Beam = s.Beam,
                    Loom = new { Id = s.MNo, Text = s.Loom },
                    FType = new { Id = s.FCode, Text = s.FType },
                    ProdB = s.ProdB,
                    ProdC = s.ProdC,
                    CutPieece = s.CutPieece,
                    Wastage = s.Wastage,
                    WeavDate = s.WeavDate,
                    Shift = new { Id = s.ShiftCode, Text = s.ShiftName },
                    OName = new { Id = s.OCode, Text = s.OName },
                    PO = new { Id = s.POCode, Text = s.POName },
                    LineMan = new { Id = s.LineManCode, Text = s.LineManName },
                    Fitter = new { Id = s.FitterCode, Text = s.FitterName },
                    Captain = new { Id = s.CaptainCode, Text = s.CaptainName },
                    InFitter = new { Id = s.InFitterCode, Text = s.InFitterName },
                    Remarks = s.Remarks
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFinishingDetail(string masterID)
        {
            var res = _repository.GetFinishingDetail(masterID);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    DID = s.DID,
                    ID = s.ID,
                    StyleNo = new { Id = s.StyleCode, Text = s.StyleNo },
                    SetNo = s.SetNo,
                    SS = s.SS,
                    Beam = s.Beam,
                    Loom = new { Id = s.MNo, Text = s.Loom },
                    FType = new { Id = s.FCode, Text = s.FType },
                    ProdB = s.ProdB,
                    ProdC = s.ProdC,
                    ProdG = s.ProdG,
                    CutPieece = s.CutPieece,
                    Wastage = s.Wastage,
                    Shift = new { Id = s.ShiftCode, Text = s.ShiftName },
                    Captain = new { Id = s.CaptainCode, Text = s.CaptainName },
                    FOP = new { Id = s.FOPID, Text = s.FOPName },
                    FMC = new { Id = s.FMCCode, Text = s.FMCName },
                    Remarks = s.Remarks
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeStopRopeDetail(string masterID)
        {
            var res = _repository.GetDyeStopRopeDetail(masterID);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    DID = s.DID,
                    ID = s.ID,
                    StyleNo = new { Id = s.StyleCode, Text = s.StyleNo },
                    SetNo = s.SetNo,
                    SS = s.SS,
                    Beam = s.Beam,
                    Loom = new { Id = s.MNo, Text = s.Loom },
                    FType = new { Id = s.FCode, Text = s.FType },
                    OName = new { Id = s.OCode, Text = s.OName },
                    Captain = new { Id = s.CaptainCode, Text = s.CaptainName },
                    OPNo = s.OPNo,
                    WarpTotalQnty = s.WarpTotalQnty,
                    ProdB = s.ProdB,
                    ProdC = s.ProdC,
                    ProdG = s.ProdG,
                    CutPieece = s.CutPieece,
                    Wastage = s.Wastage,
                    Remarks = s.Remarks
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveInspectionFaultMaster(TblInsFalt master)
        {
            var user = (User)Session["CurrentUser"];
            master.UserName = user.EMPID;
            master.EDate = DateTime.Now;
            var res = _repository.SaveInspectionFaultMaster(master);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveWarpingDetail(TblInsFaltDetail detail)
        {
            if (detail != null)
            {
                var user = (User)Session["CurrentUser"];
                detail.UserName = user.EMPID;
                detail.EDate = DateTime.Now;
                detail.DCode = 1;
                detail.DName = "Warping";
            }
            var res = _repository.SaveInspectionFaultDetail(detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveDyeingDetail(TblInsFaltDetail detail)
        {
            if (detail != null)
            {
                var user = (User)Session["CurrentUser"];
                detail.UserName = user.EMPID;
                detail.EDate = DateTime.Now;
                detail.DCode = 2;
                detail.DName = "Dyeing";
            }
            var res = _repository.SaveInspectionFaultDetail(detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveWeavingDetail(TblInsFaltDetail detail)
        {
            if (detail != null)
            {
                var user = (User)Session["CurrentUser"];
                detail.UserName = user.EMPID;
                detail.EDate = DateTime.Now;
                detail.DCode = 3;
                detail.DName = "Weaving";
            }
            var res = _repository.SaveInspectionFaultDetail(detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveFinishingDetail(TblInsFaltDetail detail)
        {
            if (detail != null)
            {
                var user = (User)Session["CurrentUser"];
                detail.UserName = user.EMPID;
                detail.EDate = DateTime.Now;
                detail.DCode = 4;
                detail.DName = "Finishing";
            }
            var res = _repository.SaveInspectionFaultDetail(detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveDyeStopRopeDetail(TblInsFaltDetail detail)
        {
            if (detail != null)
            {
                var user = (User)Session["CurrentUser"];
                detail.UserName = user.EMPID;
                detail.EDate = DateTime.Now;
                detail.DCode = 2;
                detail.DName = "Dyeing";
            }
            var res = _repository.SaveInspectionFaultDetail(detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }


    }
}