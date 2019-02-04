using BLL.HDL.Shift;
using DBManager;
using Entities.HDL;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class ShiftController : Controller
    {

        readonly IShiftRepository _repository = new ShiftService();

        public ActionResult Shift()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }
        public ActionResult SaveShift(ShiftEntity shift)
        {
            var res = _repository.SaveShift(shift);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetShiftSummary(GridOptions options)
        {
            var res = _repository.GetShiftSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TestSave(string str)
        {
           // var res = _repository.SaveShift(shift);
            return Json("", JsonRequestBehavior.AllowGet);
        }


    }
}