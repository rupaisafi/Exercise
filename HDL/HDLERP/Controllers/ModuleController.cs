using System.Collections.Generic;
using System.Web.Mvc;
using BLL.Core.Module;
using Entities.Core.Module;

namespace HDLERP.Controllers
{
    public class ModuleController : Controller
    {
        //
        // GET: /Module/
        readonly IModuleRepository _moduleRepository = new ModuleService();
        //public ActionResult Index()
        //{
        //    return View();
        //}

        public JsonResult SelectModule()
        {
            List<Module> moduleList = _moduleRepository.SelectAllModule();
            return Json(moduleList, JsonRequestBehavior.AllowGet);
        }
	}
}