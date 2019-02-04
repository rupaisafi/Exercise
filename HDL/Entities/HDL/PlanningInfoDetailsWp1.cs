using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class PlanningInfoDetailsWp1
    {
        public int PIID { get; set; }
        public int WAID { get; set; }
        public int PID { get; set; }
        public int ICode { get; set; }
        public int SCode { get; set; }
        public string YCode { get; set; }
        public decimal YCount { get; set; }
        public string Lot { get; set; }
        public int NoOfBeem { get; set; }
        public decimal NoOfCreel { get; set; }
        public int EndsPerBeem { get; set; }
        public decimal TEnds { get; set; }
        public decimal Rate { get; set; }
        public decimal Value { get; set; }
        public decimal Cost { get; set; }
        public decimal CostYds { get; set; }
        public decimal CostKg { get; set; }
        public decimal Qnty { get; set; }
        public decimal SetLength { get; set; }

        public string IName { get; set; }
        public string YarnName { get; set; }
    }
}
