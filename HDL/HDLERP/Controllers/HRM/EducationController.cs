using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.Education;
using DBManager;

namespace HDLERP.Controllers.HRM
{
    public class EducationController : Controller
    {
        private readonly IEducationRepository _educationRepository = new EducationService();

        public JsonResult GetAllDegree()
        {
            var resuList = _educationRepository.GetAllDegree();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllBoard()
        {
            var resuList = _educationRepository.GetAllBoard();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEducationInfo()
        {
            var resuList = _educationRepository.GetEducationInfo();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmpEducation(int empId)
        {
            var resuList = _educationRepository.GetEmpEducation(empId);
            var obj = new
            {
                Items = resuList,
                TotalCount = resuList.Count
            };
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
    }
}