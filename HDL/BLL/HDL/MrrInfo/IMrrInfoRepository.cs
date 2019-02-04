using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;
using Entities.HDL.DTO;

namespace BLL.HDL.MrrInfo
{
    public interface IMrrInfoRepository
    {
        ImpLcInfo GetLcInfoByLcNo(string lcNo);
        List<ItemInfoEntity> GetItemByLcNo(string lcNo);
        List<MrrBalance> GetMrrBalanceSummary(GridOptions options, string lcNo);
        MrrInformation SaveMrrInfo(MrrInformation objMrr, List<MrrDetails> objMrrDetails);
        GridEntity<MrrInformation> GetMrrInfoSummary(GridOptions options, string dateFrom, string dateTo);
        List<MrrDetails> GetAllGridData(string mrrId);
    }
}
