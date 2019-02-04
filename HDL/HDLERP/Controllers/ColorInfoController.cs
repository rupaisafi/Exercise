using BLL.HDL.ColorInfo;
using DBManager;
using Entities.HDL;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class ColorInfoController : Controller
    {
        readonly IColorInfoRepository _colorInfoRepository = new ColorInfoService();
        public ActionResult ColorInfo()
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

        public ActionResult SaveColorInfo(Color objColor)
        {
            var user = (User)Session["CurrentUser"];
            objColor.UserId = user.EMPID;
            objColor.TermId = user.TermID;
            var res = _colorInfoRepository.SaveColorInfo(objColor);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetColorInfoSummary(GridOptions options)
        {
            var res = _colorInfoRepository.GetColorInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetAllColor()
        {
            var res = _colorInfoRepository.GetAllColor();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}