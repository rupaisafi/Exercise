using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.Shift
{
    public class ShiftService : IShiftRepository
    {
        readonly ShiftDataService _shiftDataService = new ShiftDataService();

        public string SaveShift(ShiftEntity shift)
        {
            return _shiftDataService.SaveShift(shift);
        }

        public GridEntity<ShiftEntity> GetShiftSummary(GridOptions options)
        {
            return _shiftDataService.GetShiftEntity(options);
        }

    }
}
