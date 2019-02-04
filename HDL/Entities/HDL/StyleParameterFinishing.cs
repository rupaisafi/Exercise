using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class StyleParameterFinishing
    {
        public int SIID { get; set; }
        public int SID { get; set; }
        public DateTime FEDate { get; set; }
        public string FStyleNoRef { get; set; }
        public string FColourRef { get; set; }
        public int FSetRef { get; set; }
        public string FProcess { get; set; }
        public decimal FViscosity { get; set; }
        public decimal FVolume { get; set; }
        public decimal FMCRPM { get; set; }
        public decimal FDryTemp { get; set; }
        public decimal FCuringTemp { get; set; }
        public decimal FStemerTemp { get; set; }
        public string  SRemarks { get; set; }
        public decimal FRedox { get; set; }
        public decimal FPH { get; set; }
        public decimal FDyeingBoxTemp { get; set; }
        public decimal FCWTTemp2to3 { get; set; }
        public decimal FCWTTemp4to7 { get; set; }
        public decimal FPHBox { get; set; }
        public decimal FStabilizerTemp { get; set; }
        public decimal MDryTemp1 { get; set; }
        public decimal MDryTemp2 { get; set; }
        public decimal MDryTemp3 { get; set; }
        public decimal MDryTemp4 { get; set; }
        public string MRemarks { get; set; }
        public string FEDate1 { get; set; }

    }
}
