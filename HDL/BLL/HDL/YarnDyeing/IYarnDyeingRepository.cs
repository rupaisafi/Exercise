using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.YarnDyeing
{
    public interface IYarnDyeingRepository
    {
        List<DyeingYarnDetail> GetDyeingYarnDetail(int idNo);
        GridEntity<DyeingYarn> GetDyeingYarnSummary(GridOptions options, string dateFrom, string dateTo);
        DyeingYarn SaveYarnDyeingInfo(DyeingYarn dyeingYarn, List<DyeingYarnDetail> dyeingYarnDetail);
    }
}
