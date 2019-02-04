using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;
using DBManager;

namespace BLL.HRM.Unit
{
    public class UnitService : IUnitRepository
    {
        readonly UnitDataService _unitService = new UnitDataService();

        public string SaveUnit(Common_Unit objUnit)
        {
            return _unitService.SaveUnit(objUnit);
        }

        public GridEntity<Common_Unit> GetUnitSummary(GridOptions options)
        {
            return _unitService.GetUnitSummary(options);
        }

        public List<Common_Unit> GetAllUnit()
        {
            return _unitService.GetAllUnit();
        }
    }
}
