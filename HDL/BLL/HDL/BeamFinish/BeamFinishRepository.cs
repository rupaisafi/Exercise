using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;
using DAL.HDL.DataService;

namespace BLL.HDL.BeamFinish
{
    public class BeamFinishRepository : IBeamFinishRepository
    {
        BeamFinishDataService _service = new BeamFinishDataService();
        public GridEntity<TblBeamFinish> GetSummary(GridOptions options, string from, string to)
        {
            return _service.GetSummary(options, from, to);
        }
        public List<TblBeamFinishDetails> GetDetails(string masterID)
        {
            return _service.GetDetails(masterID);
        }
        public TblBeamFinish SaveBeamFinish(TblBeamFinish master)
        {
            return _service.SaveBeamFinish(master);
        }
        public TblBeamFinishDetails SaveBeamFinishDetail(TblBeamFinishDetails detail)
        {
            return _service.SaveBeamFinishDetail(detail);
        }
    }
}
