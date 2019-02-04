using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.WarpingProduction
{
    public interface IWarpingProductionRepository
    {
        List<SetInfoEntity> GetWarpingSetNo();
        WarpingPlanInfo GetInfoBySetNo(string setNo);
        List<ItemInfoEntity> GetItemBySetNo(string setNo);
        WarpingPlanInfo GetItemBySetNoAndItem(string setNo, string icNo);
        List<LotInfo> GetLotNoByIName(string iName);
        WarpingProdInfo SaveWarpingProdInfo(WarpingProdInfo objWarp, List<WarpingProdDetails> objWarpDetails);
        GridEntity<WarpingProdInfo> GetWarpingProdSummary(GridOptions options, string dateFrom, string dateTo);
        List<WarpingProdDetails> GetAllGridData(string idNo);
    }
}
