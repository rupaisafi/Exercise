using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System.Collections.Generic;

namespace BLL.HDL.SetInfo
{
    public class SetInfoService : ISetInfoRepository
    {
        readonly SetInfoDataService _dataService = new SetInfoDataService();

        public string SaveSetInfo(Entities.HDL.SetInfoEntity objSet)
        {
            return _dataService.SaveSetInfo(objSet);
        }

        public GridEntity<Entities.HDL.SetInfoEntity> GetSetInfoSummary(GridOptions options)
        {
            return _dataService.GetSetInfoSummary(options);
        }

        public List<Entities.HDL.SetInfoEntity> GetAllSetInfo()
        {
            return _dataService.GetAllSetInfo();
        }

        public List<SetProductionType> GetAllProductionType()
        {
            return _dataService.GetAllSetProdType();
        }

        public List<SetStatus> GetAllSetStatus()
        {
            return _dataService.GetAllSetStatus();
        }
    }
}
