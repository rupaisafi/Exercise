using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.BloodGroup;
using BLL.HRM.Position;

namespace HDLERP.Controllers.HRM
{
    public class PositionController : Controller
    {
        private readonly IPositionRepository _positionRepository = new PositionService();

        public JsonResult GetAll()
        {
            var resuList = _positionRepository.GetPositions();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}