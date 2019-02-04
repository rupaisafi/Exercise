using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.LoomDownTime
{
    public interface ILoomDownTimeRepository
    {
        List<LoomDownTimeDetail> GetDetail(string masterID);
        GridEntity<LoomDownTimeMaster> GetSummaryData(GridOptions options, string from, string to);
        LoomDownTimeMaster SaveLoomDownTimeMaster(LoomDownTimeMaster master);
        LoomDownTimeDetail SaveLoomDownTimeDetail(LoomDownTimeDetail detail);
    }
}
 