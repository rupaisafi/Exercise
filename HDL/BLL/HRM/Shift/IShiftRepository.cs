using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;

namespace BLL.HRM.Shift
{
    public interface IShiftRepository
    {
        string SaveShift(Common_Shift objShift);
        GridEntity<Common_Shift> GetShiftSummary(GridOptions options);
        List<Common_Shift> GetAllShift();
        List<Common_ShiftType> GetAllShiftType();
    }
}
