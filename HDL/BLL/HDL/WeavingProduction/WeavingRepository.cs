using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.WeavingProduction
{
    public class WeavingRepository : IWeavingRepository
    {
        WeavingProductionDataService _service = new WeavingProductionDataService();

        public int GetNextWeavingID()
        {
            return _service.GetNextWeavingID();
        }
        public List<EmployeeInfo> GetAllProductionFitter()
        {
            return _service.GetProductionFitter();
        }
        public List<EmployeeInfo> GetAllProductionLineman()
        {
            return _service.GetProductionLineman();
        }
        public List<EmployeeInfo> GetAllProductionOperator()
        {
            return _service.GetProductionOperator();
        }
        public List<SetInfoEntity> GetAllProductionSetNo()
        {
            return _service.GetProductionSetNo();
        }
        public List<DyeingProdDetailsSizingSlasherRope> GetAllProductionSLNo(string setNo)
        {
            return _service.GetProductionSLNo(setNo);
        }
        public List<Style> GetAllProductionStyleNo()
        {
            return _service.GetProductionStyleNo();
        }
        public List<Entities.HDL.WeavingProduction> GetProductionDetail(string wID) {
            return _service.GetProductionDetail(wID);
        }

        public GridEntity<WeavingMaster> GetProductionSummary(GridOptions options, string from, string to)
        {
            return _service.GetProductionSummary(options, from, to);
        }

        public WeavingMaster SaveProductionData(WeavingMaster master, Entities.HDL.WeavingProduction detail)
        {
            var weavingMaster = _service.SaveWeavingMaster(master);
            detail.WID = weavingMaster.WID;
            _service.SaveWeavingProduction(detail);
            return weavingMaster;
        }
    }
}
