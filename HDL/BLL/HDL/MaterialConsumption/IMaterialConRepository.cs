using DBManager;
using Entities.HDL;
using System.Collections.Generic;

namespace BLL.HDL.MaterialConsumption
{
    public interface IMaterialConRepository
    {
        //List<User> GetAllMktUser();
        Entities.HDL.MaterialConsumption SaveMaterialConsumption(Entities.HDL.MaterialConsumption consumption, List<MaterialConsumptionDetails> consumptionDetails);
        GridEntity<Entities.HDL.MaterialConsumption> GetMConsumptionSummary(GridOptions options);
        List<Entities.HDL.MaterialConsumption> GetAllMConsumptions();
        List<MaterialConsumptionDetails> GetAllGridData(string MConID);
        //Order GetMaxOrderNo();
    }
}
