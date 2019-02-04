using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.BeamFinish
{
    public interface IBeamFinishRepository
    {
        GridEntity<TblBeamFinish> GetSummary(GridOptions options, string from, string to);
        List<TblBeamFinishDetails> GetDetails(string masterID);
        TblBeamFinish SaveBeamFinish(TblBeamFinish master);
        TblBeamFinishDetails SaveBeamFinishDetail(TblBeamFinishDetails detail);
    }
}
