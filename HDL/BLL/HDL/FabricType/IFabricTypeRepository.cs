using DBManager;
using System.Collections.Generic;

namespace BLL.HDL.FabricType
{
    public interface IFabricTypeRepository
    {
        string SaveFabricType(Entities.HDL.FabricType fabricType);
        GridEntity<Entities.HDL.FabricType> GetFabricTypeSummary(GridOptions options);
        List<Entities.HDL.FabricType> GetAllFabricTypes();
    }
}
