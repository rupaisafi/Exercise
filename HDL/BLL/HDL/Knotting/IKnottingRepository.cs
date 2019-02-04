using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.Knotting
{
    public interface IKnottingRepository
    {
        KnottingMaster SaveData(KnottingMaster master, KnottingDetail detail);
        GridEntity<KnottingDetail> GetDetail(GridOptions options, string masterId);
        GridEntity<KnottingMaster> GetSummary(GridOptions options, string fromDate, string toDate);
    }
}
