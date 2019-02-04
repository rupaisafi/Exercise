using DBManager;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.PlanningInfo;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class PlanningInfoController : Controller
    {
       IPlanningInfoRepository _planningInfoRepository =new PlanningInfoService();
        public ActionResult PlanningInfo()
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
        public JsonResult GetPlanningInfoSummary(GridOptions options,string planDateFrom, string planDateTo)
        {
            var res = _planningInfoRepository.GetPlanningInfoSummary(options, planDateFrom, planDateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllUnit()
        {
            var res = _planningInfoRepository.GetAllUnit();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SavePlanningInfo(PlanningInformation objPlan, PlanningInfoDetails objPlanDetails, PlanningInfoDetailsWp objWarp, List<PlanningInfoDetailsWp1> objWarpList, PlanningInfoDetailsDye objDye, List<PlanningInfoDetailsDye1> objDyeList,PlanningInfoDetailsWv objWeav,List<PlanningInfoDetailsWv1> objWeavList)
        {
            var user = (User)Session["CurrentUser"];
            objPlan.UserId = user.EMPID;
            objPlan.TermId = user.TermID;

           var res = _planningInfoRepository.SavePlanningInfo(objPlan, objPlanDetails, objWarp, objWarpList, objDye, objDyeList, objWeav, objWeavList);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllGridData(string planId)
        {
            var user = (User)Session["CurrentUser"];
            var userId = user.USERID;
            var res = _planningInfoRepository.GetAllGridData(planId);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSetNoByUnit(int unitCode)
        {
            var res = _planningInfoRepository.GetSetNoByUnit(unitCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderInfoByOrderNo(string orderNo)
        {
            var res = _planningInfoRepository.GetOrderInfoByOrderNo(orderNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleInfoByOrderNo(string orderNo)
        {
            var res = _planningInfoRepository.GetStyleInfoByOrderNo(orderNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderInfoByByOrderNoAndStyle(string orderNo,string styleCode)
        {
            var res = _planningInfoRepository.GetOrderInfoByByOrderNoAndStyle(orderNo, styleCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetLotNoByIName(string iName)
        {
            var res = _planningInfoRepository.GetLotNoByIName(iName);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLotInfoByINameAndLotNo(string iName, string lotNo)
        {
            var res = _planningInfoRepository.GetLotInfoByINameAndLotNo(iName, lotNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetJsonObject(string iName, string lotNo)
        {
            var dt= new DataTable();
         //   var res = _planningInfoRepository.GetJsonObject();
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            var a= serializer.Serialize(rows);

            return Json(a, JsonRequestBehavior.AllowGet);
        }
    }
}