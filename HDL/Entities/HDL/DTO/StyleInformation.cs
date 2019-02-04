using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL.DTO
{
    public class StyleInformation
    {
        public int SID { get; set; }
        public int UCode { get; set; }
        public int FabricTypeCode { get; set; }
        public DateTime DevolopmentDate { get; set; }
        public string PDNo { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public decimal Weight { get; set; }
        public string Width { get; set; }
        public string Shrinkage { get; set; }
        public string Construction { get; set; }
        public string FConstruction { get; set; }
        public string YarnCode { get; set; }
        public string FabricDesc { get; set; }
        public string FinishingRoute { get; set; }
        public string WarpRatio { get; set; }
        public string WeftRatio { get; set; }
        public int TEnds { get; set; }
        public string Weave { get; set; }
        public string SetStd { get; set; }
        public int ColorId { get; set; }
        public decimal ShadeIndigo { get; set; }
        public decimal? ShadeBlack { get; set; }
        public string WarpSupp { get; set; }
        public string WarpLot { get; set; }
        public string WeftSupp { get; set; }
        public string WeftLot { get; set; }
        public string BuyerRef { get; set; }
        public int GreadCode { get; set; }
        public int PYear { get; set; }
        public string Unit { get; set; }
        public string HSCode { get; set; }
        public decimal SRate { get; set; }
        public decimal Rate1 { get; set; }
        public int StatusCode { get; set; }
        public string Trace { get; set; }
        public string Remarks { get; set; }
        public string FG { get; set; }
        public decimal WarpCons { get; set; }
        public decimal WeftCons { get; set; }
        public decimal CheCons { get; set; }
        public decimal RPM { get; set; }
        public decimal Effi { get; set; }
        public int FinishTypeCode { get; set; }
        public string CSV { get; set; }
        public int SpecialityCode { get; set; }
        public string CutableWidth { get; set; }
        public decimal StdCrimp { get; set; }
        //----------------------Finish-----------------------
        public decimal StdShrink { get; set; }
        public string WarpShrinkage { get; set; }
        public string WeftShrinkage { get; set; }
        public string WeightFinish { get; set; }
        public string WeightWash { get; set; }
        public string Skew { get; set; }
        public string Movement { get; set; }
        public string StretchAbblity { get; set; }
        public decimal Growth { get; set; }
        public decimal Recovery { get; set; }
        public string RemarksFin { get; set; }
        public string ShirnkEnzyme { get; set; }
        public string ShrinkBleach { get; set; }

        //----------------------Grey-----------------------
        public string GreyShrinkageWarp { get; set; }
        public string GreyShrinkageWeft { get; set; }
        public decimal GreyWeigth { get; set; }
        public string GreyWashWeigth { get; set; }
        public string GreySkew { get; set; }
        public string GreyStretchAbblity { get; set; }
        public decimal GreyWidth { get; set; }
        public int GEPI { get; set; }
        public int GPPI { get; set; }
        public string RemarksGrey { get; set; }
        public int RPMGrey { get; set; }
        public decimal EffiGrey { get; set; }
        public decimal Crime { get; set; }
        public string ReedSpaceGrey { get; set; }
        public string ReedCount { get; set; }
        public string EndsDent { get; set; }

        //----------------------Fabric-----------------------
        public string TensileStrengthWarp { get; set; }
        public string TensileStrengthWeft { get; set; }
        public string TearingStrengthWarp { get; set; }
        public string TearingStrengthWeft { get; set; }
        public string CrockingFastnessDry { get; set; }
        public string CrockingFastnessWeft { get; set; }
        public string ColourFastnessWash { get; set; }
        public string ColourFastnessAcetate { get; set; }
        public string ColourFastnessCotton { get; set; }
        public string ColourFastnessNylon { get; set; }
        public string ColourFastnessPolyster { get; set; }
        public string ColourFastnessAcrylic { get; set; }
        public string ColourFastnessWool { get; set; }
        public string PH { get; set; }
        public string Moisture { get; set; }
        public string Steffness { get; set; }
        public decimal PickEffi { get; set; }
        public int RPMFab { get; set; }
        public decimal ValueLoss { get; set; }
        public string RemarksFab { get; set; }
        public string ReedSpaceFab { get; set; }
    }
}
