using BLL.HDL.InspectionProduction;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class InspectionProductionController : Controller
    {
        IInspectionProductionRepository _repository = new InspectionProductionRepository();
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
        public JsonResult GetSummary(GridOptions options, string from, string to)
        {
            var res = _repository.GetSummary(options, from, to);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductionDetail(string masterID)
        {
            var res = _repository.GetProductionDetail(masterID);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    DID = s.DID,
                    ID = s.ID,
                    Set = new { Id = s.SetNo, Text = s.SetNo },
                    Style = new { Id = s.StyleCode, Text = s.StyleNo },
                    Width = s.Width,
                    FabQuality = s.FabQuality,
                    ProdB = s.ProdB,
                    ProdC = s.ProdC,
                    ProdG = s.ProdG,
                    CutPieece = s.CutPieece,
                    Wastage = s.Wastage,
                    TotalRoll = s.TotalRoll,
                    PType = new { Id = s.PCode, Text = s.PType },
                    FinishMC = new { Id = s.FinishMCCode, Text = s.FinishMCName },
                    FType = new { Id = s.FCode, Text = s.FType },
                    Remarks = s.Remarks,

                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(new List<int>(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOperatorProductionDetail(string masterID)
        {
            var res = _repository.GetOperatorProductionDetail(masterID);
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    DID = s.DID,
                    ID = s.ID,
                    Shift = new { Id = s.ShiftCode, Text = s.Shift },
                    OName = new { Id = s.OCode, Text = s.OName },
                    Desig = s.Desig,
                    Captain = new { Id = s.CapCode, Text = s.CapName },
                    AcProd = s.AcProd,
                    ReFinish = s.ReFinish,
                    ReInspection = s.ReInspection,
                    Sample = s.Sample,
                    QCCheque = s.QCCheque,
                    Hold = s.Hold,
                    CP = s.CP,
                    CutPeace = s.CutPeace,
                    STimeHr = s.STimeHr,
                    GreyMending = s.GreyMending,
                    Remarks = s.Remarks
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(new List<int>(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllSetNo()
        {
            var res = _repository.GetAllSetNo();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.SetNo,
                    Text = s.SetNo,
                    StyleNo = s.StyleNo,
                    StyleCode = s.SetNo1,
                    PCode = s.ProductionTypeCode,
                    PType = s.Remarks
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllStyleNo()
        {
            var res = _repository.GetAllStyleNo();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.StyleCode,
                    Text = s.StyleNo,
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllPType()
        {
            var res = _repository.GetAllPType();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.OCode,
                    Text = s.OType,
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
                    Text = s.MName,
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllFType()
        {
            var res = _repository.GetAllFType();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.FCode,
                    Text = s.Falt,
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllOperator()
        {
            var res = _repository.GetAllOperator();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.Name,
                    CapCode = s.CapCode,
                    CapName = s.CapName
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCaptain()
        {
            var res = _repository.GetAllCaptain();
            if (res != null)
            {
                var result = res.Select(s => new
                {
                    Id = s.CardNo,
                    Text = s.PoName,
                });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveInspectionProductionMaster(TblStock11 master)
        {
            if (master != null)
            {
                var user = (User)Session["CurrentUser"];
                master.DCode = 5;
                master.DName = "Inspection";
                master.UserName = user.USERNAME;
                master.EDate = DateTime.Now;
            }
            var res = _repository.SaveInspectionProductionMaster(master);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveInspectionProductionDetail(TblStock21 productionDetail)
        {
            if (productionDetail != null)
            {
                var user = (User)Session["CurrentUser"];
                productionDetail.UserName = user.USERNAME;
                productionDetail.EDate = DateTime.Now;
            }
            var res = _repository.SaveInspectionProductionDetail(productionDetail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveInspectionOperatorProductionDetail(TblStock22 operatorProductionDetail)
        {
            if (operatorProductionDetail != null)
            {
                var user = (User)Session["CurrentUser"];
                operatorProductionDetail.UName = user.USERNAME;
                operatorProductionDetail.EDate = DateTime.Now;
            }
            var res = _repository.SaveInspectionOperatorProductionDetail(operatorProductionDetail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}