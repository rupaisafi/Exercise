using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;
using Entities.HDL.DTO;

namespace BLL.HDL.PlanningInfo
{
    public interface IPlanningInfoRepository
    {
        GridEntity<PlanningInfoSummaryEntity> GetPlanningInfoSummary(GridOptions options, string planDateFrom, string planDateTo);
        PlanningInformation SavePlanningInfo(PlanningInformation objPlan, PlanningInfoDetails objPlanDetails, PlanningInfoDetailsWp objWarp, List<PlanningInfoDetailsWp1> objWarpList, PlanningInfoDetailsDye objDye, List<PlanningInfoDetailsDye1> objDyeList, PlanningInfoDetailsWv objWeav, List<PlanningInfoDetailsWv1> objWeavList);
        List<PlanningDetails> GetAllGridData(string planId);
        List<Unit> GetAllUnit();
        List<Entities.HDL.SetInfoEntity> GetSetNoByUnit(int unitCode);
        Order GetOrderInfoByOrderNo(string orderNo);
        List<Style> GetStyleInfoByOrderNo(string orderNo);
        OrderStyleInfo GetOrderInfoByByOrderNoAndStyle(string orderNo, string styleCode);
        List<LotInfo> GetLotNoByIName(string iName);
        LotInfo GetLotInfoByINameAndLotNo(string iName, string lotNo);
    }
}
