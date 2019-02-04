using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.DyeingProduction
{
    public interface IDyeingProductionRepository
    {
        //List<SetInfoEntity> GetWarpingSetNo();
        DyeingPlanInfo GetInfoBySetNo(string setNo);
        Style GetInfoByStyleCode(string styleCode);
        //List<ItemInfoEntity> GetItemBySetNo(string setNo);
        //WarpingPlanInfo GetItemBySetNoAndItem(string setNo, string icNo);
        //List<LotInfo> GetLotNoByIName(string iName);
        DyeingProdInfo SaveDyeingProdInfo(DyeingProdInfo prodInfo, List<DyeingProdDetailsDyeRope> dyeRopes, List<DyeingProdDetailsLCBRope> lCBRopes, List<DyeingProdDetailsSizingSlasherRope> sizingSlasherRopes);
        GridEntity<DyeingProdInfo> GetDyeingProdSummary(GridOptions options, string dateFrom, string dateTo);
        List<DyeingProdDetailsDyeRope> GetAllDyeRopeGridData(int idNo);
        List<DyeingProdDetailsLCBRope> GetAllLCBRopeGridData(int idNo);
        List<DyeingProdDetailsSizingSlasherRope> GetAllSizingGridData(int idNo);
    }
}
