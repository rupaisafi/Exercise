
using BLL.HDL.CausticRecovery;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class CausticRecoveryController : Controller
    {
        ICausticRecoveryRepository _repository = new CausticRecoveryRepository();
        // GET: CausticRecovery
        public ActionResult CausticRecoveryInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("CausticRecoveryInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public ActionResult SaveMasterInfo(CausticRecovery objMaster)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveMasterInfo(objMaster);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}