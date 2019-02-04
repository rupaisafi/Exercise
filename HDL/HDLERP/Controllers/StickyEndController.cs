using BLL.HDL.StickyEnd;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class StickyEndController : Controller
    {
        IStickyEndRepository _repository = new StickyEndRepository();

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetSummary(GridOptions options, string from, string to)
        {
            var res = _repository.GetSummary(options, from, to);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetail(GridOptions options, string sID)
        {
            var res = _repository.GetDetail(options, sID);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveStickyEndData(StickyEnds stickyEnd, StickyEndsDetails stickyEndDetail)
        {
            var res1 = new StickyEnds();
            if (ModelState.IsValid)
            {
                //res1 = _repository.SaveStickyEnd(stickyEnd);
                if (res1.SaveStatus == Operation.Success.ToString())
                {
                    var res2 = new StickyEndsDetails();
                    stickyEndDetail.SID = res1.SID;
                    //res2 = _repository.SaveStickyEndDeatils(stickyEndDetail);
                    res1.SaveStatus = res2.SaveStatus;
                }
            }
            else
            {
                res1.SaveStatus = Operation.Failed.ToString();
            }
                        
            return Json(res1, JsonRequestBehavior.AllowGet);
        }
    }
}