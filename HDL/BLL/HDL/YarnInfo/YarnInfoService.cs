using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.YarnInfo
{
    public class YarnInfoService: IYarnInfoRepository
    {
        readonly YarnInfoDataService _yarnInfoDataService =new YarnInfoDataService();
        public string SaveYarnInfo(Yarn objYarn)
        {
            return _yarnInfoDataService.SaveYarnInfo(objYarn);
        }

        public GridEntity<Yarn> GetYarnInfoSummary(GridOptions options)
        {
            return _yarnInfoDataService.GetYarnInfoSummary(options);
        }

        public List<Yarn> GetAllYarn()
        {
            return _yarnInfoDataService.GetAllYarn();
        }
    }
}
