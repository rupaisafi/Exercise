using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Core.Module
{
    public interface IModuleRepository
    {
        List<Entities.Core.Module.Module> SelectAllModule();
    }
}
