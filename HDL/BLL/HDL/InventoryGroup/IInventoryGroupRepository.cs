using DBManager;

namespace BLL.HDL.InventoryGroup
{
    public interface IInventoryGroupRepository
    {
        string SaveGroup(Entities.HDL.InventoryGroupEntity groupEntity);
        GridEntity<Entities.HDL.InventoryGroupEntity> GetGroupSummary(GridOptions options);
    }
}
