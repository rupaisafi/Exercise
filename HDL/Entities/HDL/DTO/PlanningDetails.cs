using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL.DTO
{
    public class PlanningDetails
    {
        public List<PlanningInfoDetailsWp1> WarpingInfo { get; set; }
        public List<PlanningInfoDetailsDye1> DyeingInfo { get; set; }
        public List<PlanningInfoDetailsWv1> WeavingInfo { get; set; }
    }
}
