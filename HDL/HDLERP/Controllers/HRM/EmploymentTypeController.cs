using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.EmploymentType;

namespace HDLERP.Controllers.HRM
{
    public class EmploymentTypeController : Controller
    {
        private readonly IEmploymentTypeRepository _typeRepository = new EmploymentTypeService();
        public JsonResult GetAll()
        {
            var resuList = _typeRepository.GetEmploymentTypes();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}