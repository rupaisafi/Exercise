using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class StyleParamGrey
    {
        public int SIID { get; set; }

        public int SID { get; set; }

        public string GreyShrinkageWarp { get; set; }

        public string GreyShrinkageWeft { get; set; }

        public decimal GreyWeigth { get; set; }

        public string GreyWashWeigth { get; set; }

        public string GreySkew { get; set; }

        public string GreyStretchAbblity { get; set; }

        public decimal GreyWidth { get; set; }

        public int GEPI { get; set; }

        public int GPPI { get; set; }

        public string Remarks { get; set; }

        public int RPM { get; set; }

        public decimal Effi { get; set; }

        public decimal Crime { get; set; }

        public string ReedSpace { get; set; }

        public string ReedCount { get; set; }

        public string EndsDent { get; set; }
    }
}
