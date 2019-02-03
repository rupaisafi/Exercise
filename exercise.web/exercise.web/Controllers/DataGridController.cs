using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace exercise.web.Controllers
{
    public class DataGridController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}