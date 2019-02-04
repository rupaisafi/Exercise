using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class StyleParamFinish
    {
        public int SIID { get; set; }

        public int SID { get; set; }

        public string WarpShrinkage { get; set; }

        public string WeftShrinkage { get; set; }

        public string WeightFinish { get; set; }

        public string WeightWash { get; set; }

        public string Skew { get; set; }

        public string Movement { get; set; }

        public string StretchAbblity { get; set; }

        public decimal Growth { get; set; }

        public decimal Recovery { get; set; }

        public string Remarks { get; set; }

        public string ShirnkEnzyme { get; set; }

        public string ShrinkBleach { get; set; }
    }
}
