using BLL.HDL.Machine;
using DBManager;
using Entities.HDL;
using System;
using System.Web.Mvc;


namespace HDLERP.Controllers
{
    public class MachineController : Controller
    {
        //Machine
        readonly IMachineRepository _repository = new MachineService();

        public ActionResult Machine()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }
        public ActionResult SaveMachine(MachineEntity machineEntity)
        {
            var user = (User)Session["CurrentUser"];
            machineEntity.UserName = user.EMPID;
            machineEntity.EDate = DateTime.Now;

            var res = _repository.SaveMachine(machineEntity);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMachineSummary(GridOptions options)
        {
            var res = _repository.GetMachineSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}