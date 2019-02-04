using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.BloodGroup;

namespace HDLERP.Controllers.HRM
{
    public class BloodGroupController : Controller
    {
        private readonly IBloodGroupRepository _bloodGroupRepository = new BloodGroupService();

        public JsonResult GetAll()
        {
            var resuList = _bloodGroupRepository.GetBloodGroups();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}