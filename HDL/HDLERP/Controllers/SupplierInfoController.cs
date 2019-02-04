using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.SupplierInfo;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class SupplierInfoController : Controller
    {
        readonly ISupplierRepository _SupplierInfoRepository = new SupplierService();
        public ActionResult SupplierInfo()
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
        public ActionResult SaveSupplierInfo(Supplier objSupplier)
        {
            var user = (User)Session["CurrentUser"];
            objSupplier.UserId = user.EMPID;
            objSupplier.TermId = user.TermID;
            var res = _SupplierInfoRepository.SaveSupplierInfo(objSupplier);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSupplierInfoSummary(GridOptions options)
        {
            var res = _SupplierInfoRepository.GetSupplierInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllSupplier()
        {
            var res = _SupplierInfoRepository.GetAllSupplier();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMaxSupplierCode()
        {
            var res = _SupplierInfoRepository.GetMaxSupplierCode();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}