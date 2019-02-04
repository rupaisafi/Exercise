using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class LotInfo
    {
        public string LotNo { get; set; }
        public string LotNo1 { get; set; }
        public string SCode { get; set; }
        public string SName { get; set; }
        public string TCode { get; set; }
        public decimal RQnty { get; set; }
        public decimal IQnty { get; set; }
        public decimal BQnty { get; set; }
        public decimal RValue { get; set; }
        public decimal IValue { get; set; }
        public decimal BValue { get; set; }
        public decimal BRate { get; set; }

        public string CottonCode { get; set; }
        public string CottonType { get; set; }
        public string YarnCode { get; set; }

    }
}
