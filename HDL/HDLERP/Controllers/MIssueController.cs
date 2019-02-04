using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.MIssue;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class MIssueController : Controller
    {
       IMIssueRepository _issueRepository = new MIssueService();
        public ActionResult MIssueInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public ActionResult SaveMIssueInfo(MIssueInfo objMIssue, List<MIssueDetails> objMIssueDetails)
        {
            var user = (User)Session["CurrentUser"];
            objMIssue.UserId = user.EMPID;
            objMIssue.TermId = user.TermID;
            var res = _issueRepository.SaveMIssueInfo(objMIssue, objMIssueDetails);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMIssueInfoSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = _issueRepository.GetMIssueInfoSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllGridData(string missueId)
        {
            var res = _issueRepository.GetAllGridData(missueId);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}