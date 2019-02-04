using BLL.HRM.Team;
using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers.HRM
{
    public class TeamController : Controller
    {
        private readonly ITeamRepository _teamRepository = new TeamService();

        public ActionResult TeamSettings()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("../HRM/Team/TeamSettings");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }

        public ActionResult SaveTeam(Common_Team objTeam)
        {
            var res = _teamRepository.SaveTeam(objTeam);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTeamSummary(GridOptions options)
        {
            var res = _teamRepository.GetTeamSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAll()
        {
            var resuList = _teamRepository.GetAllTeam();
            return Json(resuList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSectionWingSummary(GridOptions options)
        {
            var List = _teamRepository.GetSectionWingSummary(options);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTeamPermissionSummary(GridOptions options, string SWingID)
        {
            var List = _teamRepository.GetTeamPermissionSummary(options, SWingID);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveTeamPermission(int SWingID, List<R_WingTeam> objSecTeamList, List<R_WingTeam> objRemovedTeamList)
        {
            var res = _teamRepository.SaveTeamPermission(SWingID, objSecTeamList, objRemovedTeamList);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}