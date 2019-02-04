using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.InspectionFloorStock
{
    public class InspectionFloorStockRepository : IInspectionFloorStockRepository
    {

        InspectionFloorStockDataService _service = new InspectionFloorStockDataService();
        public string SaveMasterInfo(InspectionFloorStockMaster objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }
        public string SaveDetailInfo(InspectionFloorStockDetail obj)
        {
            return _service.SaveDetailInfo(obj);
        }

        public GridEntity<InspectionFloorStockMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _service.GetSummary(options, dateFrom, dateTo);
        }
        public List<Entities.HDL.InspectionFloorStockDetail> GetDetailByID(string ID)
        {
            return _service.GetDetailByID(ID);
        }
        
    }
}
