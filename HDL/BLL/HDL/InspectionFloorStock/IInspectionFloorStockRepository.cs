using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.InspectionFloorStock
{
   public interface IInspectionFloorStockRepository
    {
        string SaveMasterInfo(InspectionFloorStockMaster objMaster);
        string SaveDetailInfo(InspectionFloorStockDetail obj);
        
        GridEntity<Entities.HDL.InspectionFloorStockMaster> GetSummary(GridOptions options, string dateFrom, string dateTo);
        List<Entities.HDL.InspectionFloorStockDetail> GetDetailByID(string ID);
        
    }
}
