using AUtilities;
using BLL.Core.User;
using BLL.Login;
using DBManager;
using Entities.HDL;
using System;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class HomeController : Controller
    {
        readonly ILoginRepository _loginRepository = new LoginService();
        readonly IUserRepository _userRepository = new UserService();
        public ActionResult Index()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }

            return RedirectToAction("Logoff", "Home");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult ChangePassword()
        {
            if (Session["CurrentUser"] != null)
            {
                return View();
            }
            else
            {
                Session["CurrentUser"] = null;
                return RedirectToAction("Logoff", "Home");
            }
        }


        public ActionResult ValidateUserLogin(string loginId, string password)
        {
            string res = "";
            string remot_addr1 = Request.ServerVariables["REMOTE_ADDR"];
            string hostName = "Unknown1";
            string clientUserAddress = "Unknown2";
            try
            {
                if (!string.IsNullOrEmpty(remot_addr1))
                {
                    hostName = System.Net.Dns.GetHostEntry(remot_addr1).HostName;
                    if (!string.IsNullOrEmpty(hostName))
                        clientUserAddress = System.Net.Dns.GetHostAddresses(hostName).GetValue(0).ToString();
                }
                else
                {
                    hostName = Request.UserHostName.ToString();
                    clientUserAddress = Request.UserHostAddress.ToString();
                }
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                hostName = Request.UserHostName.ToString();
                clientUserAddress = Request.UserHostAddress.ToString();

            }

            string trueIP = "";

            //  Determine if the client is behind a proxy
            string ipBehindProxy = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            //  In case of multiple entry find the correct IP for the client
            if (!string.IsNullOrEmpty(ipBehindProxy))
            {
                string[] ipRange = ipBehindProxy.Split(',');
                trueIP = ipRange[0].Trim();
            }
            else
            {
                trueIP = hostName.ToUpper();
            }


            Session["PCName"] = hostName.ToUpper(); ;



            var user = new User();

            try
            {
                user = _loginRepository.ValidateUserLogin(loginId, password, hostName);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
            if (user != null)
            {
                user.TermID = Environment.MachineName;
                var cookies = HttpContext.Request.Cookies;
                Session["CurrentUser"] = user;
                Session.Timeout = 240;
                res = Operation.Success.ToString();
            }
            else
            {
                res = Operation.Failed.ToString();
            }

            //write log 
            //string log = user.USERNAME + ", " + Environment.MachineName;
            //LogWriter l = new LogWriter("Login User Info : " + log);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCurrentUser()
        {
            var user = (User)Session["CurrentUser"];
            //user.UserId = 1;
            //user.LoginId = "Admin";
            //user.UserName = "System Administrator";
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LogOff()
        {
            Session["CurrentUser"] = null;
            return View("Index");
            //return View("LoginForm");
            //return View("LoginForm2");

        }

        public JsonResult GetUserList()
        {
            var res = _userRepository.GetUserList();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PasswordChange(string curpassword, string newpassword)
        {
            var user = (User)Session["CurrentUser"];
            var res = _userRepository.ChangePassword(curpassword, newpassword, user.EMPID, user.USERNAME);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SwitchLoginUser(string usrid)
        {
            var res = false;
            var user = _userRepository.GetUserInfoById(usrid);

            if (user != null)
            {
                Session["CurrentUser"] = user;
                res = true;
            }
            return Json(res, JsonRequestBehavior.AllowGet);

        }
    }
}