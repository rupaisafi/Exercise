using DAL.HDL.DataService;
using DBManager;
using System.Collections.Generic;

namespace BLL.HDL.FabricType
{
    public class FabricTypeService : IFabricTypeRepository
    {
        readonly FabricTypeDataService _fabricTypeDataService = new FabricTypeDataService();
        public string SaveFabricType(Entities.HDL.FabricType fabricType)
        {
            return _fabricTypeDataService.SaveFabTypeInfo(fabricType);
        }

        public GridEntity<Entities.HDL.FabricType> GetFabricTypeSummary(GridOptions options)
        {
            return _fabricTypeDataService.GetFabricTypeEntity(options);
        }

        public List<Entities.HDL.FabricType> GetAllFabricTypes()
        {
            return _fabricTypeDataService.GetAllFabricTypes();
        }
    }
}
