using BLL.HDL.InventoryGroup;
using DBManager;
using Entities.HDL;
using System;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class InventoryGroupController : Controller
    {

        readonly IInventoryGroupRepository _repository = new InventoryGroupService();

        public ActionResult InventoryGroup()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }
        public ActionResult SaveInventoryGroup(InventoryGroupEntity groupEntity)
        {
            var user = (User)Session["CurrentUser"];
            groupEntity.UserName = user.EMPID;
            groupEntity.EDate = DateTime.Now;

            var res = _repository.SaveGroup(groupEntity);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInventoryGroupSummary(GridOptions options)
        {
            var res = _repository.GetGroupSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}