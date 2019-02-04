using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.OrderInfo;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class OrderInfoController : Controller
    {
        IOrderInfoRepository _orderInfoRepository = new OrderInfoService();
        public ActionResult OrderInfo()
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

        public JsonResult GetAllMktUser()
        {
            var res = _orderInfoRepository.GetAllMktUser();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveOrderInfo(Order objOrder,List<OrderDetails> objOrderDetails)
        {
            var user = (User)Session["CurrentUser"];
            objOrder.UserId = user.EMPID;
            objOrder.TermId = user.TermID;
            var res = _orderInfoRepository.SaveOrderInfo(objOrder, objOrderDetails);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderInfoSummary(GridOptions options)
        {
            var res = _orderInfoRepository.GetOrderInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllOrder()
        {
            var res = _orderInfoRepository.GetAllOrder();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllGridData(string orderNo)
        {
            var res = _orderInfoRepository.GetAllGridData(orderNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMaxOrderNo()
        {
            var res = _orderInfoRepository.GetMaxOrderNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}