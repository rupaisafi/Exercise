using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.InventoryGroup
{
    public class InventoryGroupService : IInventoryGroupRepository
    {
        readonly InventoryGroupDataService _dataService = new InventoryGroupDataService();

        public string SaveGroup(InventoryGroupEntity groupEntity)
        {
            return _dataService.SaveGroup(groupEntity);
        }

        public GridEntity<InventoryGroupEntity> GetGroupSummary(GridOptions options)
        {
            return _dataService.GetGroupEntity(options);
        }

    }
}
