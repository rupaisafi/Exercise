using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.FinishingProduction
{
  public  interface IFinishingRepository
    {
        List<Entities.HDL.WeavingProduction> GetAllFinishingBeamNo(string setNo, string SLNo);
        List<Entities.HDL.ProdTypeFinishing> GetAllProdType();
        List<Entities.HDL.EmployeeInfo> GetFinishingOperator();
        List<Entities.HDL.FinishRoute> GetFinishingRoute();
        string SaveMasterInfo(FinisgingProductionMaster objMaster);
        string SaveDetailInfo(FinishingProductionDetail objDetail);
        GridEntity<Entities.HDL.FinisgingProductionMaster> GetProductionSummary(GridOptions options, string dateFrom, string dateTo);
        List<Entities.HDL.FinishingProductionDetail> GetProductionDetail(int FID);
        List<DyeingProdDetailsSizingSlasherRope> GetAllProductionSLNo(string setNo);
    }
    

}
