using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HDL;
using DAL.HDL.DataService;

namespace BLL.HDL.InspectionCheck
{
    public class InspectionCheckRepository : IInspectionCheckRepository
    {
        InspectionCheckDataService _service = new InspectionCheckDataService();
        public List<InspectionCheckRejectionToFinish> GetAllInspectionCheckRejectionToFinish()
        {
            return _service.GetAllInspectionCheckRejectionToFinish();
        }
        public List<InspectionCheckProductionToFinish> GetAllInspectionCheckProductionToFinish()
        {
            return _service.GetAllInspectionCheckProductionToFinish();
        }
    }
}
