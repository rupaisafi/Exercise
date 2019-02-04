using BLL.HDL.DyeingUtility;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class DyeingUtilityController : Controller
    {
        IDyeingUtilityRepository _dyeingUtilityRepo = new DyeingUtilityRepository();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllDyeingSet()
        {
            var res = _dyeingUtilityRepo.GetAllDyeingSet();
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDyeingProcessInfo(string setNo)
        {
            var res = _dyeingUtilityRepo.GetDyeingProcessInfo(setNo).SingleOrDefault();
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAllRunAndStop(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllRunAndStop(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAllTimeUtilization(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllTimeUtilization(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWastageDetail(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllWastageDetail(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDrainageDetail(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllDrainageDetail(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCreelUnit(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllCreelUnit(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeingParameter(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllDyeingParameter(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSizingParameter(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllSizingParameter(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllHeadStock(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllHeadStock(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCompensator(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllCompensator(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllRecipe(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllRecipe(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCreelLoading(string setNo)
        {
            var res = _dyeingUtilityRepo.GetAllCreelLoading(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult SaveDyeingProcessInfo(DyeingProcess dyeingProcess)
        {
            var user = (User)Session["CurrentUser"];
            if (dyeingProcess != null)
            {
                dyeingProcess.UserName = user.USERNAME;
            }
            var res = _dyeingUtilityRepo.SaveDyeingProcessInfo(dyeingProcess);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveRunAndStop(DyeingUtilityRunAndStop runAndStop)
        {
            var user = (User)Session["CurrentUser"];
            if (runAndStop != null)
            {
                runAndStop.UserID = user.USERID;
                runAndStop.TermID = user.TermID;
                runAndStop.EntryDate = DateTime.Now;
            }
            var res = _dyeingUtilityRepo.SaveRunAndStop(runAndStop);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveTimeUtilization(DyeingUtilityTimeUtilization timeUtilization)
        {
            var user = (User)Session["CurrentUser"];
            if (timeUtilization != null)
            {
                timeUtilization.UserID = user.USERID;
                timeUtilization.TermID = user.TermID;
                timeUtilization.EntryDate = DateTime.Now;
            }
            var res = _dyeingUtilityRepo.SaveTimeUtilization(timeUtilization);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveWastageDetail(DyeingUtilityWastageDetail wastageDetail)
        {
            var user = (User)Session["CurrentUser"];
            if (wastageDetail != null)
            {
                if (wastageDetail.ID == 0)
                {
                    wastageDetail.EntryBy = user.USERID;
                    wastageDetail.EntryDate = DateTime.Now;
                }
                else
                {
                    wastageDetail.UpdateBy = user.USERID;
                    wastageDetail.UpdateDate = DateTime.Now;
                }

            }
            var res = _dyeingUtilityRepo.SaveWastageDetail(wastageDetail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveDrainageDetail(DyeingUtilityDrainageDetail drainageDetail)
        {
            var user = (User)Session["CurrentUser"];
            if (drainageDetail != null)
            {
                if (drainageDetail.ID == 0)
                {
                    drainageDetail.EntryBy = user.USERID;
                    drainageDetail.EntryDate = DateTime.Now;
                }
                else
                {
                    drainageDetail.UpdateBy = user.USERID;
                    drainageDetail.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveDrainageDetail(drainageDetail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveCreelUnit(DyeingProcessCreelUnit creelUnit)
        {
            var user = (User)Session["CurrentUser"];
            if (creelUnit != null)
            {
                if (creelUnit.ID == 0)
                {
                    creelUnit.EntryBy = user.USERID;
                    creelUnit.EntryDate = DateTime.Now;
                }
                else
                {
                    creelUnit.UpdateBy = user.USERID;
                    creelUnit.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveCreelUnit(creelUnit);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveDyeingParameter(DyeingProcessDyeingParameter dyeingParameter)
        {
            var user = (User)Session["CurrentUser"];
            if (dyeingParameter != null)
            {
                if (dyeingParameter.ID == 0)
                {
                    dyeingParameter.EntryBy = user.USERID;
                    dyeingParameter.EntryDate = DateTime.Now;
                }
                else
                {
                    dyeingParameter.UpdateBy = user.USERID;
                    dyeingParameter.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveDyeingParameter(dyeingParameter);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveSizingParameter(DyeingProcessSizingParameter sizingParameter)
        {
            var user = (User)Session["CurrentUser"];
            if (sizingParameter != null)
            {
                if (sizingParameter.ID == 0)
                {
                    sizingParameter.EntryBy = user.USERID;
                    sizingParameter.EntryDate = DateTime.Now;
                }
                else
                {
                    sizingParameter.UpdateBy = user.USERID;
                    sizingParameter.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveSizingParameter(sizingParameter);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveHeadStock(DyeingProcessHeadStock headStock)
        {
            var user = (User)Session["CurrentUser"];
            if (headStock != null)
            {
                if (headStock.ID == 0)
                {
                    headStock.EntryBy = user.USERID;
                    headStock.EntryDate = DateTime.Now;
                }
                else
                {
                    headStock.UpdateBy = user.USERID;
                    headStock.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveHeadStock(headStock);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveCompensator(DyeingProcessCompensator compensator)
        {
            var user = (User)Session["CurrentUser"];
            if (compensator != null)
            {
                if (compensator.ID == 0)
                {
                    compensator.EntryBy = user.USERID;
                    compensator.EntryDate = DateTime.Now;
                }
                else
                {
                    compensator.UpdateBy = user.USERID;
                    compensator.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveCompensator(compensator);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveRecipe(DyeingProcessRecipe recipe)
        {
            var user = (User)Session["CurrentUser"];
            if (recipe != null)
            {
                if (recipe.ID == 0)
                {
                    recipe.EntryBy = user.USERID;
                    recipe.EntryDate = DateTime.Now;
                }
                else
                {
                    recipe.UpdateBy = user.USERID;
                    recipe.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveRecipe(recipe);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveCreelLoading(DyeingProcessCreelLoading creelLoading)
        {
            var user = (User)Session["CurrentUser"];
            if (creelLoading != null)
            {
                if (creelLoading.ID == 0)
                {
                    creelLoading.EntryBy = user.USERID;
                    creelLoading.EntryDate = DateTime.Now;
                }
                else
                {
                    creelLoading.UpdateBy = user.USERID;
                    creelLoading.UpdateDate = DateTime.Now;
                }
            }
            var res = _dyeingUtilityRepo.SaveCreelLoading(creelLoading);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}