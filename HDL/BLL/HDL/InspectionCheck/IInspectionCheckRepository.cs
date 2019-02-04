using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HDL;

namespace BLL.HDL.InspectionCheck
{
    public interface IInspectionCheckRepository
    {
        List<InspectionCheckRejectionToFinish> GetAllInspectionCheckRejectionToFinish();
        List<InspectionCheckProductionToFinish> GetAllInspectionCheckProductionToFinish();        
    }
}
