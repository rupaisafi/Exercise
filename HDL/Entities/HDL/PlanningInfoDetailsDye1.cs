using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class PlanningInfoDetailsDye1
    {
        public int PIID { get; set; }
        public int DAID { get; set; }
        public int PID { get; set; }
        public int ICode { get; set; }
        public int SCode { get; set; }
        public string YCode { get; set; }
        public string YCount { get; set; }
        public decimal Rate { get; set; }
        public decimal Value { get; set; }
        public decimal Qnty { get; set; }

        public string IcName { get; set; }
        public string SName { get; set; }
        public string Remarks { get; set; }
    }
}
