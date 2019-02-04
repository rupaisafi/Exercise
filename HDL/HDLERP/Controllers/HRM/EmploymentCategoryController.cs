using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HRM.EmploymentCategory;

namespace HDLERP.Controllers.HRM
{
    public class EmploymentCategoryController : Controller
    {
        readonly IEmploymentCategoryRepository _categoryRepository = new EmploymentCategoryService();
        public JsonResult GetAll()
        {
            var resuList = _categoryRepository.GetEmploymentCategories();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }
    }
}