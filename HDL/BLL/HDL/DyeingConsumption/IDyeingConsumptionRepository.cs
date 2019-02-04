using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.DyeingConsumption
{
    public interface IDyeingConsumptionRepository
    {
        GridEntity<DyeingConsumptionInfo> GetDyeingConsumptionSummary(GridOptions options, string dateFrom, string dateTo);
        DyeingConsumptionInfo GetDyeingConsumptionInfo(string setNo);
        DataTable SaveDyeingConsumption(string setNo, List<DyeingConsumptionDetail> consumptions);
        GridEntity<DyeingConsumptionDetail> GetDyeingConsumptionDetailsSummary(GridOptions options, string setNo);
    }
}
