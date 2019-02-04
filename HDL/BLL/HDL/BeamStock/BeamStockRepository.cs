using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;
using DAL.HDL.DataService;

namespace BLL.HDL.BeamStock
{
    public class BeamStockRepository : IBeamStockRepository
    {
        BeamStockDataService _service = new BeamStockDataService();

        public List<ObjectModel> GetAllSetNo()
        {
            return _service.GetAllSetNo();
        }
        public List<Department> GetAllDepartment()
        {
            return _service.GetAllDepartment();
        }
        public List<ProductionType> GetAllProductionType()
        {
            return _service.GetAllProductionType();
        }

        public List<TblBeamStockDetails> GetDetails(string masterID)
        {
            return _service.GetDetails(masterID);
        }
        public GridEntity<TblBeamStock> GetSummary(GridOptions options, string from, string to)
        {
            return _service.GetSummary(options, from, to);
        }

        public TblBeamStock SaveBeamStock(TblBeamStock master)
        {
            return _service.SaveBeamStock(master);
        }
        public TblBeamStockDetails SaveBeamStockDetail(TblBeamStockDetails detail)
        {
            return _service.SaveBeamStockDetail(detail);
        }
    }
}
