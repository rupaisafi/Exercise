using BLL.Core.User;
using DBManager;
using Entities.Core.Menu;
using System.Collections.Generic;
using System.Web.Mvc;

namespace HDLERP.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/
        readonly IUserRepository _userRepository = new UserService();
        public ActionResult UserSettings()
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

        public JsonResult GetUserSummary(GridOptions options, string usrId)
        {
            var res = _userRepository.GetUserSummary(options, usrId);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveUserPermission(MenuPermission usrObj, List<MenuPermission> objUserMenuList, List<MenuPermission> objRemovedMenuList)
        {
            var res = _userRepository.SaveUserPermission(usrObj, objUserMenuList, objRemovedMenuList);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}