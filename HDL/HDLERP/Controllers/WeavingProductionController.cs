using BLL.HDL.WeavingProduction;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class WeavingProductionController : Controller
    {
        IWeavingRepository _repository = new WeavingRepository();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetNextWeavingID()
        {
            var ID = _repository.GetNextWeavingID();
            return Json(new { ID = ID }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProductionOperator()
        {
            var res = _repository.GetAllProductionOperator();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProductionLineman()
        {
            var res = _repository.GetAllProductionLineman();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProductionFitter()
        {
            var res = _repository.GetAllProductionFitter();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProductionSetNo()
        {
            var res = _repository.GetAllProductionSetNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProductionSLNo(GridOptions options)
        {
            var res = new List<DyeingProdDetailsSizingSlasherRope>();
            if (options.filter != null)
            {
                res = _repository.GetAllProductionSLNo(options.filter.Filters[0].Value);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProductionStyleNo()
        {
            var res = _repository.GetAllProductionStyleNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductionSummary(GridOptions options, string from, string to)
        {
            var res = _repository.GetProductionSummary(options, from, to);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductionDetail(string wID) {
            var res = _repository.GetProductionDetail(wID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveProductionData(WeavingMaster master, WeavingProduction detail) {
            master.WeaveDate = DateTime.Now;
            master.TrackDate = DateTime.Now;
            master.EntryDate = DateTime.Now;
            detail.EDate = DateTime.Now;
            var res = _repository.SaveProductionData(master, detail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}