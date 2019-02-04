using DBManager;

namespace BLL.HDL.Shift
{
    public interface IShiftRepository
    {
        string SaveShift(Entities.HDL.ShiftEntity shift);
        GridEntity<Entities.HDL.ShiftEntity> GetShiftSummary(GridOptions options);
    }
}
