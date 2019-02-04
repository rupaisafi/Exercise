using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.LoomDownTime
{
    public class LoomDownTimeRepository : ILoomDownTimeRepository
    {
        readonly LoomDownTimeDataService _service = new LoomDownTimeDataService();

        public List<LoomDownTimeDetail> GetDetail(string masterID)
        {
            return _service.GetDetail(masterID);
        }
        public GridEntity<LoomDownTimeMaster> GetSummaryData(GridOptions options, string from, string to)
        {
            return _service.GetSummaryData(options, from, to);
        }

        public LoomDownTimeDetail SaveLoomDownTimeDetail(LoomDownTimeDetail detail)
        {
            return _service.SaveLoomDownTimeDetail(detail);
        }

        public LoomDownTimeMaster SaveLoomDownTimeMaster(LoomDownTimeMaster master)
        {
            return _service.SaveLoomDownTimeMaster(master);
        }
    }
}
