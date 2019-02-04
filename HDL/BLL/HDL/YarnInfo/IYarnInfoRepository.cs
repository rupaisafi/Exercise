using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.YarnInfo
{
    public interface IYarnInfoRepository
    {
        string SaveYarnInfo(Yarn objYarn);
        GridEntity<Yarn> GetYarnInfoSummary(GridOptions options);
        List<Yarn> GetAllYarn();
    }
}
