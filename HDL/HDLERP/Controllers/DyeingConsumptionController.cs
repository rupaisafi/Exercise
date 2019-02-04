using BLL.HDL.DyeingConsumption;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class DyeingConsumptionController : Controller
    {
        IDyeingConsumptionRepository consumptionRepository = new DyeingConsumptionRepository();

        // GET: DyeingConsumption
        public ActionResult DyeingConsumptionInfo()
        {
            return View();
        }
        public JsonResult GetDyeingConsumptionDetailsSummary(GridOptions options, string setNo)
        {
            var res = consumptionRepository.GetDyeingConsumptionDetailsSummary(options, setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeingConsumptionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = consumptionRepository.GetDyeingConsumptionSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeingConsumptionInfo(string setNo)
        {
            var res = consumptionRepository.GetDyeingConsumptionInfo(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveDyeingConsumption(string setNo, List<DyeingConsumptionDetail> consumptionDetail)
        {
            DyeingConsumptionInfo info = new DyeingConsumptionInfo();
            var consumptions = consumptionDetail == null ? new List<DyeingConsumptionDetail>() : consumptionDetail;
            var user = (User)Session["CurrentUser"];
            if (consumptions.Count > 0)
            {
                foreach (var consumption in consumptions)
                {
                    consumption.UserId = user.USERID;
                    consumption.TermId = user.TermID;
                }
                try
                {
                    consumptionRepository.SaveDyeingConsumption(setNo, consumptions);
                    info.SaveStatus = Operation.Success.ToString();
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                    info.SaveStatus = Operation.Error.ToString();
                }
            }
            else
            {
                info.SaveStatus = Operation.NoChange.ToString();
            }

            return Json(info, JsonRequestBehavior.AllowGet);
        }
    }
}
