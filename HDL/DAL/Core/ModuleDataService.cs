using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.Core.Module;

namespace DAL.Core
{
    public class ModuleDataService
    {
        CommonDataService _commonDataService = new CommonDataService();
        public List<Module> SelectAllModule()
        {
            var res= _commonDataService.Select_Data_List<Module>("SP_SELECT_MODULE", "GET_ALL_MODULE");
            return res;
        }
    }
}
