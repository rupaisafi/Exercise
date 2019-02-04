using BLL.HDL.WarpLapper;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class WarpLapperController : Controller
    {
        IWarpLapperRepository warpLapperRepository = new WarpLapperRepository();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetWarpingBySetNo(string setNo)
        {
            var res = warpLapperRepository.GetWarpingBySetNo(setNo).FirstOrDefault();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetWarpingDetailByIdNo(string idNo)
        {
            var res = warpLapperRepository.GetWarpingDetailByIdNo(idNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveWarpingDetail(WarpingProdDetails prodDetails)
        {
            if (prodDetails!=null)
            {
                prodDetails.WarpDate = DateTime.Now;
                prodDetails.TracDate = DateTime.Now;
                prodDetails.RowDate = DateTime.Now;
            }
            var res = warpLapperRepository.SaveWarpDetail(prodDetails);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}