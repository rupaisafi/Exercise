using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.LcInfo
{
    public interface ILcInfoRepository
    {
        ImpLcInfo SaveLcInfo(ImpLcInfo objLc, List<ImpLcDetails> objLcDetails);
        GridEntity<ImpLcInfo> GetLcInfoSummary(GridOptions options);
        List<ImpLcDetails> GetAllGridData(string lcId);
    }
}
