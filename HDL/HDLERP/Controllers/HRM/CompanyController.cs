using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DBManager;
using Entities.HDL;
using Entities.HRM;
using BLL.HRM.Company;

namespace HDLERP.Controllers.HRM
{
    public class CompanyController : Controller
    {
        readonly ICompanyRepository _companyInfoRepository = new CompanyService();

        public ActionResult CompanyInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("../HRM/Company/CompanyInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }

        public ActionResult SaveCompany(Common_Company objCompany)
        {
            var res = _companyInfoRepository.SaveCompany(objCompany);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCompanySummary(GridOptions options)
        {
            var res = _companyInfoRepository.GetCompanySummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllCompany()
        {
            var res = _companyInfoRepository.GetAllCompany();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}