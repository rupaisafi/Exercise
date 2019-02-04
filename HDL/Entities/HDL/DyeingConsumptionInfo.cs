using System;

namespace Entities.HDL
{
    public class DyeingConsumptionInfo
    {
        public int DID { get; set; }
        public DateTime DyeDate { get; set; }
        public int SetNo { get; set; }
        public int? LengthMtr { get; set; }
        public int? LengthKg { get; set; }
        public string Colour { get; set; }
        public string YCode { get; set; }
        public string WarpRatio { get; set; }
        public string EndsPerBeam { get; set; }
        public string NoOfBeam { get; set; }
        public int? RopeBeam { get; set; }
        public string NoOfCreel { get; set; }
        public int? TotalEnd { get; set; }
        public int? MCSpeed { get; set; }
        public int DyMCSpeed { get; set; }
        public string ProYarnLot { get; set; }
        public string ProYarnSupp { get; set; }
        public decimal? AvgCount { get; set; }
        public string MCStartTime { get; set; }
        public string MCStopTime { get; set; }
        public decimal? MCRunTime { get; set; }
        public decimal? MCRunTimemm { get; set; }
        public string Remarks { get; set; }
        public decimal? ShadePercentIndigo { get; set; }
        public decimal? ShadePercentBlack { get; set; }
        public string ShadeMatchWith { get; set; }
        public string Bath { get; set; }
        public string Feeding { get; set; }
        public string Refraction { get; set; }
        public string Viscosity { get; set; }
        public string Buyer { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public string GConstruction { get; set; }
        public string FConstruction { get; set; }
        public int? Weigth { get; set; }
        public string Weave { get; set; }
        public string Width { get; set; }
        public int? AfLengthMtr { get; set; }
        public int? AfLengthKg { get; set; }
        public int? DCode { get; set; }
        public string DName { get; set; }
        public string PType { get; set; }
        public int? PTCode { get; set; }
        public string MCNo { get; set; }
        public int? MCCode { get; set; }
        public int? UCode { get; set; }
        public string UnitName { get; set; }
        public DateTime? EDate { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
        public string SaveStatus { get; set; }
    }
}
