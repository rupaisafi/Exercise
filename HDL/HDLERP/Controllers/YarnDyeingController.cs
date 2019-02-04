using BLL.HDL.YarnDyeing;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class YarnDyeingController : Controller
    {
        IYarnDyeingRepository yarnDyeingRepository = new YarnDyeingRepository();

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetDyeingYarnSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var res = yarnDyeingRepository.GetDyeingYarnSummary(options, dateFrom, dateTo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDyeingYarnDetail(int dID)
        {
            var res = yarnDyeingRepository.GetDyeingYarnDetail(dID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveYarnDyeingInfo(DyeingYarn dyeingYarn, List<DyeingYarnDetail> dyeingYarnDetail)
        {
            var res = new DyeingYarn();
            var user = (User)Session["CurrentUser"];
            if (dyeingYarn != null && dyeingYarnDetail != null)
            {
                dyeingYarn.UCode = 2;
                dyeingYarn.UName = "Rope";
                dyeingYarn.EDate = DateTime.Now;
                dyeingYarn.TracDate = DateTime.Now;
                dyeingYarn.UserName = user.USERNAME;

                res = yarnDyeingRepository.SaveYarnDyeingInfo(dyeingYarn, dyeingYarnDetail);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}