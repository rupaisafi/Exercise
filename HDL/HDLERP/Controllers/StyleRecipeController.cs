using BLL.HDL.StyleRecipe;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace HDLERP.Controllers
{
    public class StyleRecipeController : Controller
    {
        // GET: StyleRecipe
        IStyleRecipeRepository _repository = new StyleRecipeRepository();
        public ActionResult StyleRecipeInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("StyleRecipeInfo");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }
        public JsonResult GetAllStyle()
        {
            var res = _repository.GetAllStyle();

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSetNo()
        {
            var res = _repository.GetAllSetNo();

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllColor()
        {
            var res = _repository.GetAllColor();

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleParameter( int SID)
        {
            var res = _repository.GetStyleParameter(SID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetICode()
        {
            var res = _repository.GetICode();

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleRecipe(int SID)
        {
            var res = _repository.GetStyleRecipe(SID);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveInfo(StyleParameterFinishing objRec)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveInfo(objRec);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveDetailInfo(StyleDetailsFinishingRecepi objRec)
        {
            var user = (User)Session["CurrentUser"];
            //objMaster.UserId = user.EMPID;
            // objMaster.UName = user.EMPID;
            var res = _repository.SaveDetailInfo(objRec);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}