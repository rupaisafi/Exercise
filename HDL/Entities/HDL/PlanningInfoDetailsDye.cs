using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class PlanningInfoDetailsDye
    {
        public int DAID { get; set; }
        public int PID { get; set; }
        public int LengthMtr { get; set; }
        public int ColorId { get; set; }
        public string BeamSpace { get; set; }
        public string BeamLength { get; set; }
        public string RefStd { get; set; }
    }
}
