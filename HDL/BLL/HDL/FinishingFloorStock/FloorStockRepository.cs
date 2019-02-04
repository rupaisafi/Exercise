using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.FinishingFloorStock
{
    public class FloorStockRepository : IFloorStockRepository
    {
        FinishingFloorStockDataService _service = new FinishingFloorStockDataService();
        public string SaveMasterInfo(FinishingStockMaster objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }
        public string SaveRecInfo(FinishingStockRec objRec)
        {
            return _service.SaveRecInfo(objRec);
        }
        public string SaveDisInfo(FinishingStockDispatch objDis)
        {
            return _service.SaveDisInfo(objDis);
        }
        public GridEntity<FinishingStockMaster> GetStockSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _service.GetStockSummary(options, dateFrom, dateTo);
        }
        public List<Entities.HDL.FinishingStockRec> GetStockRec(int FID)
        {
            return _service.GetStockRec(FID);
        }
        public List<Entities.HDL.FinishingStockDispatch> GetStockDis(int FID)
        {
            return _service.GetStockDis(FID);
        }
    }
}
