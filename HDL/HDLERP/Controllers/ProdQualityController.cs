using BLL.HDL.ProdQuality;
using DBManager;
using Entities.HDL;
using System;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class ProdQualityController : Controller
    {
        readonly IProdQualityRepository _repository = new ProdQualityService();

        public ActionResult ProdQuality()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }
        public ActionResult SaveProdQuality(ProdQualityEntity entity)
        {
            var user = (User)Session["CurrentUser"];
            entity.UserName = user.EMPID;
            entity.EDate = DateTime.Now;

            var res = _repository.SaveProdQuality(entity);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdQualitySummary(GridOptions options)
        {
            var res = _repository.GetProdQualitySummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}