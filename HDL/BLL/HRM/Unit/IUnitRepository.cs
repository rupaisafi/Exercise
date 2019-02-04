using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HRM.Unit
{
    public interface IUnitRepository
    {
        string SaveUnit(Common_Unit objUnit);
        GridEntity<Common_Unit> GetUnitSummary(GridOptions options);
        List<Common_Unit> GetAllUnit();
    }
}
