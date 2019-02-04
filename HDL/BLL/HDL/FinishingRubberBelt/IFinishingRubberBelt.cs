using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL.HDL.FinishingRubberBelt
{
   public interface IFinishingRubberBelt
    {
        List<Entities.HDL.RubberBelt> GetBeltType();
        string SaveMasterInfo(RubberBelt objMaster);
        string SaveDetailInfo(RubberBeltDetail objDetail);
        GridEntity<Entities.HDL.RubberBelt> GetProductionSummary(GridOptions options, string dateFrom, string dateTo);
        List<Entities.HDL.RubberBeltDetail> GetDetailByID(int RID);
    }
}
