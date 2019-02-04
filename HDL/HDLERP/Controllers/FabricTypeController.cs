using BLL.HDL.FabricType;
using DBManager;
using Entities.HDL;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class FabricTypeController : Controller
    {

        readonly IFabricTypeRepository _fabricTypeRepository = new FabricTypeService();

        public ActionResult FabricType()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }
        public ActionResult SaveFabricType(FabricType fabricType)
        {
            var res = _fabricTypeRepository.SaveFabricType(fabricType);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFabricTypeSummary(GridOptions options)
        {
            var res = _fabricTypeRepository.GetFabricTypeSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllFabricTypes()
        {
            var res = _fabricTypeRepository.GetAllFabricTypes();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}