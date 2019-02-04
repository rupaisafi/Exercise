using BLL.HDL.MaterialConsumption;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class MaterialConsumptionController : Controller
    {
        // MaterialConsumption

        readonly IMaterialConRepository _repository = new MaterialConService();

        public ActionResult MaterialConsumption()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }

        public ActionResult SaveMaterialConsumption(MaterialConsumption consumption, List<MaterialConsumptionDetails> consumptionDetails)
        {
            var user = (User)Session["CurrentUser"];
            consumption.UserName = user.EMPID;
            consumption.TermId = user.TermID;
            consumption.EDate = DateTime.Now;

            foreach (var cd in consumptionDetails)
            {
                cd.UserName = user.EMPID;
                cd.EDate = DateTime.Now;
            }

            var res = _repository.SaveMaterialConsumption(consumption, consumptionDetails);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMConsumptionSummary(GridOptions options)
        {
            var res = _repository.GetMConsumptionSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllMConsumptions()
        {
            var res = _repository.GetAllMConsumptions();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllGridData(string MConID)
        {
            var res = _repository.GetAllGridData(MConID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }


    }
}