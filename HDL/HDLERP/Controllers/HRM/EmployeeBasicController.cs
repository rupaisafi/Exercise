using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Mvc;
using AUtilities;
using BLL.HRM.EmployeeBasic;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace HDLERP.Controllers.HRM
{
    public class EmployeeBasicController : Controller
    {
        private readonly IEmployeeBasicRepository _employeeBasicRepository = new EmployeeBasicService();
        public ActionResult EmployeeInfo()
        {
            if (Session["CurrentUser"] != null)
                return View("../HRM/EmployeeBasic/EmployeeInfo");
            else
                return RedirectToAction("Logoff", "Home");
        }
        public ActionResult EmployeeSearch()
        {
            if (Session["CurrentUser"] != null)
                return View("../HRMCommonView/_SearchEmployee");
            else
                return RedirectToAction("Logoff", "Home");
        }
        public JsonResult GetEmployeeInfoSummary(GridOptions options)
        {
            var res = _employeeBasicRepository.GetEmployeeInfoSummary(options);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Save(HumanResource_EmployeeBasic objEmployeeBasic, List<HumanResource_EmployeeEducation> objEducation, HumanResource_EmployeeContact objContact, HumanResource_EmployeePassport objPassport, HumanResource_EmployeeDrivingLicense objDrivingLicense)
        {
            var user = (User)Session["CurrentUser"];
            objEmployeeBasic.UserID = user.USERID;
            objEmployeeBasic.TermninalID = user.TermID;
            objEmployeeBasic.Photo = (byte[])Session["Photo"];
            var res = _employeeBasicRepository.Save(objEmployeeBasic, objEducation, objContact, objPassport, objDrivingLicense);
            Session["Photo"] = null;
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ProfilePictureSave(IEnumerable<HttpPostedFileBase> files)
        {

            var uploadStatus = "";
            Session["MemberPictureUpload"] = null;
            Session["Photo"] = null;
            if (files != null)
            {
                User objUser = ((User)(Session["CurrentUser"]));
                try
                {
                    string uploadLocation = "";

                    var companyId = objUser.COMPANYID;
                    //Logo Store Location 
                    //Virtual Directory

                    var logoPathWillbe = @"~/Upload/MemberPhotos/" + companyId;
                    //Creating Directory If Not exist
                    uploadLocation = Utility.GetUploadPath(logoPathWillbe);
                    foreach (var file in files)
                    {
                        byte[] rawBytes = null;
                        if (file != null)
                        {
                            rawBytes = new byte[file.ContentLength];
                            file.InputStream.Read(rawBytes, 0, file.ContentLength);
                            Session["Photo"] = rawBytes;
                        }

                        // Some browsers send file names with full path.
                        // We are only interested in the file name.
                        var fileName = Path.GetFileName(file.FileName);
                        //var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);
                        //var physicalPath = Path.Combine(Server.MapPath(logoPathWillbe), fileName);
                        //Save Logo By companyId
                        //file.SaveAs(physicalPath);
                        Session["MemberPictureUpload"] = logoPathWillbe.Replace("~", "..") + "/" + fileName;
                        uploadStatus = logoPathWillbe.Replace("~", "..") + "/" + fileName;
                    }



                }
                catch (Exception ex)
                {
                    Session["Photo"] = null;
                    uploadStatus = ex.Message;
                }

            }

            // Return an empty string to signify success
            return Json(uploadStatus, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ProfilePictureRemove(string[] fileNames)
        {
            // The parameter of the Remove action must be called "fileNames"
            var uploadStatus = "";
            if (fileNames != null)
            {
                //string uploadLocation = "";
                //User objUser = ((User)(Session["CurrentUser"]));
                try
                {

                    // var companyId = objUser.COMPANYID;

                    //Logo Store Location 
                    //Virtual Directory
                    // var logoPathWillbe = @"~/Upload/MemberPhotos/" + companyId;
                    //foreach (var fullName in fileNames)
                    //{
                    //    var fileName = Path.GetFileName(fullName);
                    //    var physicalPath = Path.Combine(Server.MapPath(logoPathWillbe), fileName);

                    //    // TODO: Verify user permissions

                    //    if (System.IO.File.Exists(physicalPath))
                    //    {
                    //        // The files are  actually removed from stored location
                    //        System.IO.File.Delete(physicalPath);
                    //        // uploadStatus = logoPathWillbe.Replace("~", "..") + "/" + fileName;
                    //    }
                    //}

                }
                catch (Exception ex)
                {
                    uploadStatus = ex.Message;
                }



            }

            // Return an empty string to signify success
            return Json(uploadStatus, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPersonalProfilePicture()
        {
            var res = "";
            if (Session["MemberPictureUpload"] != null)
            {
                res = Session["MemberPictureUpload"].ToString();
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeTreeResult()
        {
            var res = _employeeBasicRepository.GetEmployeeTreeResult();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEmployeeSummary(GridOptions options, List<TreeItem> treelist, string searchKey, int status)
        {
            var res = _employeeBasicRepository.GetEmployeeSummary(options, treelist, searchKey, status);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}