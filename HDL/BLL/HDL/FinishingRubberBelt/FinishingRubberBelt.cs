using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;


namespace BLL.HDL.FinishingRubberBelt
{
   public class FinishingRubberBelt :IFinishingRubberBelt
    {
        FinishingRubberBeltDataService _service = new FinishingRubberBeltDataService();
        public List<Entities.HDL.RubberBelt> GetBeltType()
        {
            return _service.GetBeltType();
        }
        public string SaveMasterInfo(RubberBelt objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }
        public string SaveDetailInfo(RubberBeltDetail objDetail)
        {
            return _service.SaveDetailInfo(objDetail);
        }
        public GridEntity<RubberBelt> GetProductionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _service.GetProductionSummary(options, dateFrom, dateTo);
        }
        public List<Entities.HDL.RubberBeltDetail> GetDetailByID(int RID)
        {
            return _service.GetDetailByID(RID);
        }
    }
}
