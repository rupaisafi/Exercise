using System.Web.Mvc;
using DBManager;

namespace HDLERP.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
      
      
        public ActionResult Dashboard()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("../Dashboard/Dashboard");
            }
            else
            {
                return RedirectToAction("Logoff", "Home");
            }
        }

    }
}