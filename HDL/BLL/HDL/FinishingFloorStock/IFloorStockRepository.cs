using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.FinishingFloorStock
{
    public interface IFloorStockRepository
    {
        string SaveMasterInfo(FinishingStockMaster objMaster);
        string SaveRecInfo(FinishingStockRec objRec); 
        string SaveDisInfo(FinishingStockDispatch objDis);
        GridEntity<Entities.HDL.FinishingStockMaster> GetStockSummary(GridOptions options, string dateFrom, string dateTo);
        List<Entities.HDL.FinishingStockRec> GetStockRec(int FID); 
        List<Entities.HDL.FinishingStockDispatch> GetStockDis(int FID);
    }
}
