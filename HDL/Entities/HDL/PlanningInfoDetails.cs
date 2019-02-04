using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class PlanningInfoDetails
    {
        public int PIID { get; set; }
        public int PID { get; set; }
        public int StyleCode { get; set; }
        public string StyleNo { get; set; }
        public string Weight { get; set; }
        public int TypeId { get; set; }
        public string Construction { get; set; }
        public string FConstruction { get; set; }
        public string Weave { get; set; }
        public string Width1 { get; set; }
        public int ColourId { get; set; }
        public string FabricDesc { get; set; }
        public int TCode { get; set; }
        public string FEPIxPPI { get; set; }
        public string FinishingRoute { get; set; }
        public string WarpRatio { get; set; }
        public string WeftRatio { get; set; }
        public int TEnds { get; set; }
        public string ShadeIndigo { get; set; }
        public string ShadeBlack { get; set; }
        public string YarnCode { get; set; }
        public string SetStd { get; set; }
        public string WashStd { get; set; }
        public string Appearnce { get; set; }
        public string WarpShrinkage { get; set; }
        public string WeftShrinkage { get; set; }
        public string WeightFinish { get; set; }
        public string WeightWash { get; set; }
        public string StretchAbblity { get; set; }
        public string Skew { get; set; }
        public string Movement { get; set; }
        public string FinishWidth { get; set; }
        public decimal FinishLength { get; set; }
        public decimal GreyWidth { get; set; }
        public decimal GreyWeight { get; set; }
        public decimal GreyEPI { get; set; }
        public decimal GreyPPI { get; set; }
        public decimal ReedSpace { get; set; }
        public decimal ReedCount { get; set; }
        public decimal EndDent { get; set; }
        public string Remarks { get; set; }
        public string UserName { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
