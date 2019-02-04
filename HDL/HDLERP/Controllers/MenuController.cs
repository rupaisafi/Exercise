using System;
using System.Collections.Generic;
using System.Web.Mvc;
using BLL.Core.Menu;
using DBManager;
using Entities.Core.Menu;
using Entities.HDL;

namespace HDLERP.Controllers
{
	public class MenuController : Controller
	{
		//
		// GET: /Menu/
		readonly IMenuRepository _menuRepository = new MenuService();
		
		public ActionResult MenuSettings()
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
		public ActionResult SaveMenu(Menu menu)
		{
			var res = "";
			User user = ((User)(Session["CurrentUser"]));
			try
			{
				var mn = menu.MenuName.Replace('^', '&');
				menu.MenuName = mn;
				menu.MenuPath = RemoveRightSlash(menu.MenuPath);
				res = _menuRepository.SaveMenu(menu);
			}
			catch (Exception exception)
			{
				res = exception.Message;
			}

			return Json(res,JsonRequestBehavior.AllowGet);

		}

		public ActionResult UpdateMenuSorting(List<Menu> menuList)
		{
			var res = "";
			User user = ((User)(Session["CurrentUser"]));
			try
			{
				res = _menuRepository.UpdateMenuSorting(menuList, user);

			}
			catch (Exception exception)
			{
				res = exception.Message;
			}
			return Json(res, JsonRequestBehavior.AllowGet);
		}
		private string RemoveRightSlash(string menuPath)
		{
			var resMenuPath = menuPath;
			try
			{
				if (!string.IsNullOrEmpty(menuPath))
				{
					var index = menuPath.Length - 1;
					var path = (menuPath.LastIndexOf('/') == index) ? menuPath.Remove(index) : menuPath;
					resMenuPath = (menuPath == path) ? path : RemoveRightSlash(path);
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}
			return resMenuPath;
		}

		public JsonResult GetMenuSummary(GridOptions options)
		{

			var menuList = _menuRepository.GetMenuSummary(options);
			return Json(menuList,JsonRequestBehavior.AllowGet);
		}

		public ActionResult GetMenuByModuleId(int moduleId)
		{

			List<Menu> menuList = _menuRepository.SelectAllMenuByModuleId(moduleId);
			return Json(menuList, JsonRequestBehavior.AllowGet);
		}

		public JsonResult SelectAllMenuForSorting()
		{

			List<Menu> menuList = _menuRepository.SelectAllMenu();

			var results = new
			{
				Items = menuList,
				TotalCount = 0
			};

			return Json(results);
		}
		public ActionResult SelectMenuByUserPermission()
		{
			try
			{
				string userId = "";
				if (Session["CurrentUser"] != null)
				{
					User user = ((User)(Session["CurrentUser"]));
					userId = user.EMPID;

					List<Menu> menuList = _menuRepository.SelectMenuByUserPermission(userId);
					return Json(menuList, JsonRequestBehavior.AllowGet);
				}
				else
				{
					return RedirectToAction("Logoff", "Home");
				}

			}
			catch (Exception ex)
			{
				throw ex;
			}

		}

		public JsonResult GetMenuPermissionSummary(GridOptions options, string usrId)
		{

			//  User user = ((User)(Session["CurrentUser"]));

			var menuList = _menuRepository.GetMenuPermissionSummary(options, usrId);
			return Json(menuList, JsonRequestBehavior.AllowGet);
		}
	   
	}
}