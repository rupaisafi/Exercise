using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;
using BLL.HRM.Shift;
using DAL.HRM;

namespace BLL.HRM.Shift
{
    public class ShiftService : IShiftRepository
    {
        readonly ShiftDataService _ShiftDataService = new ShiftDataService();
        public string SaveShift(Common_Shift objShift)
        {
            return _ShiftDataService.SaveShift(objShift);
        }

        public GridEntity<Common_Shift> GetShiftSummary(GridOptions options)
        {
            return _ShiftDataService.GetShiftSummary(options);
        }

        public List<Common_Shift> GetAllShift()
        {
            return _ShiftDataService.GetAllShift();
        }

        public List<Common_ShiftType> GetAllShiftType()
        {
            return _ShiftDataService.GetAllShiftType();
        }
    }
}