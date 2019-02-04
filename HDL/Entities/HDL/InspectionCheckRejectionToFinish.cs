using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class InspectionCheckRejectionToFinish
    {
        public DateTime? TracDate { get; set; }
        public string FaultMonth { get; set; }
        public int? FaultYear { get; set; }
        public int ID { get; set; }
        public DateTime SDate { get; set; }
        public string Ref { get; set; }
        public int? StyleCode { get; set; }
        public string StyleNo { get; set; }
        public decimal? Weight { get; set; }
        public string Constraction { get; set; }
        public string Weave { get; set; }
        public string Colour { get; set; }
        public string Width { get; set; }
        public int? Prod { get; set; }
        public int? ProdB { get; set; }
        public int? ProdC { get; set; }
        public int? CutPieece { get; set; }
        public int? Wastage { get; set; }
        public int? TotalProd { get; set; }
        public string Remarks { get; set; }
        public int? CCode { get; set; }
        public string CName { get; set; }
        public int? TotalRoll { get; set; }
        public int? TotalPoint { get; set; }
        public int? SetNo { get; set; }
        public int? SS { get; set; }
        public string Loom { get; set; }
        public string Beam { get; set; }
        public int? FCode { get; set; }
        public string FType { get; set; }
        public int? DCode { get; set; }
        public string DName { get; set; }
        public int? UCode { get; set; }
        public string UName { get; set; }
        public int? FMCCode { get; set; }
        public string FMCName { get; set; }
        public string OName { get; set; }
        public string OCode { get; set; }
        public string POName { get; set; }
        public string POCode { get; set; }
        public string CaptainName { get; set; }
        public string CaptainCode { get; set; }
    }
}
