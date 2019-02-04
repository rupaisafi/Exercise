using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.ItemInfo;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class ItemInfoController : Controller
    {
        static readonly IItemInfoRepository _itemInfoRepository = new ItemInfoService();
        public ActionResult ItemInfo()
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
        public JsonResult GetAllGroupName()
        {
            var res = _itemInfoRepository.GetAllGroupName();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllItemType()
        {
            var res = _itemInfoRepository.GetAllItemType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveItemInfo(ItemInfoEntity objItem)
        {
            var user = (User)Session["CurrentUser"];
            objItem.UserId = user.EMPID;
            objItem.TermId = user.TermID;
            var res = _itemInfoRepository.SaveItemInfo(objItem);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemInfoSummary(GridOptions options)
        {
            var res = _itemInfoRepository.GetItemInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GenerateMaxItemCode()
        {
            var res = _itemInfoRepository.GenerateMaxItemCode();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}