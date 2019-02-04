using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.FinishingProduction
{
   public class FinishingRepository :IFinishingRepository
    {
        FinishingProductionDataService _service = new FinishingProductionDataService();
        public List<Entities.HDL.WeavingProduction> GetAllFinishingBeamNo(string setNo,string SLNo)
        {
            return _service.GetFinishingBeamNo(setNo,SLNo);
        }
        public List<Entities.HDL.ProdTypeFinishing> GetAllProdType()
        {
            return _service.GetAllProdType();
        }
        public List<Entities.HDL.EmployeeInfo> GetFinishingOperator()
        {
            return _service.GetFinishingOperator();
        }
        public List<Entities.HDL.FinishRoute> GetFinishingRoute()
        {
            return _service.GetFinishingRoute();
        }
        public string SaveMasterInfo(FinisgingProductionMaster objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }
        public string SaveDetailInfo(FinishingProductionDetail objDetail)
        {
            return _service.SaveDetailInfo(objDetail);
        }
        public GridEntity<FinisgingProductionMaster> GetProductionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _service.GetProductionSummary(options, dateFrom, dateTo);
        }
        public List<Entities.HDL.FinishingProductionDetail> GetProductionDetail(int FID)
        {
            return _service.GetProductionDetail(FID);
        }
        public List<DyeingProdDetailsSizingSlasherRope> GetAllProductionSLNo(string setNo)
        {
            return _service.GetProductionSLNo(setNo);
        }
    }
}
