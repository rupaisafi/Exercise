using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Core;

namespace BLL.Core.Module
{
    public class ModuleService:IModuleRepository
    {
        readonly ModuleDataService _moduleDataService = new ModuleDataService();
        public List<Entities.Core.Module.Module> SelectAllModule()
        {
            return _moduleDataService.SelectAllModule();
        }
    }
}
