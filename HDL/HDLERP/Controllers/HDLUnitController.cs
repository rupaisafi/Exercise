using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.CommonInfo;

namespace HDLERP.Controllers
{
    public class HDLUnitController : Controller
    {
        ICommonInfoRepository _commonInfoRepository =new CommonInfoService();
        public JsonResult GetAllUnit()
        {
            var res = _commonInfoRepository.GetAllUnit();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}