using DBManager;
using Entities.HDL;
using System.Collections.Generic;

namespace BLL.HDL.SetInfo
{
    public interface ISetInfoRepository
    {
        string SaveSetInfo(Entities.HDL.SetInfoEntity objSet);
        GridEntity<Entities.HDL.SetInfoEntity> GetSetInfoSummary(GridOptions options);
        List<Entities.HDL.SetInfoEntity> GetAllSetInfo();

        List<SetProductionType> GetAllProductionType();
        List<SetStatus> GetAllSetStatus();
    }
}
