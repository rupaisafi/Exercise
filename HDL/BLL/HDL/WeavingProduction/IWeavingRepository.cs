using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.WeavingProduction
{
    public interface IWeavingRepository
    {
        int GetNextWeavingID();
        List<EmployeeInfo> GetAllProductionFitter();
        List<EmployeeInfo> GetAllProductionLineman();
        List<EmployeeInfo> GetAllProductionOperator();
        List<DyeingProdDetailsSizingSlasherRope> GetAllProductionSLNo(string setNo);
        List<SetInfoEntity> GetAllProductionSetNo();
        List<Style> GetAllProductionStyleNo();
        List<Entities.HDL.WeavingProduction> GetProductionDetail(string wID);
        GridEntity<WeavingMaster> GetProductionSummary(GridOptions options, string from, string to);
        WeavingMaster SaveProductionData(WeavingMaster master, Entities.HDL.WeavingProduction detail);
    }
}
