using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.BeamStock
{
    public interface IBeamStockRepository
    {
        List<ObjectModel> GetAllSetNo();
        List<Department> GetAllDepartment();
        List<ProductionType> GetAllProductionType();
        List<TblBeamStockDetails> GetDetails(string masterID);
        GridEntity<TblBeamStock> GetSummary(GridOptions options, string from, string to);

        TblBeamStock SaveBeamStock(TblBeamStock master);
        TblBeamStockDetails SaveBeamStockDetail(TblBeamStockDetails detail);
    }
}
