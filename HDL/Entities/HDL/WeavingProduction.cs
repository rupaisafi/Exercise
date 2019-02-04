namespace Entities.HDL
{
    using System;
    public class WeavingProduction
    {
        public int WIID { get; set; }
        public int WID { get; set; }
        public string Shift { get; set; }
        public string WorkerShift { get; set; }
        public string Loom { get; set; }
        public int RPM { get; set; }
        public int StyleCode { get; set; }
        public string StyleNo { get; set; }
        public decimal? Weight { get; set; }
        public int? PPI { get; set; }
        public decimal? TotalPicks { get; set; }
        public decimal? MCEfficiency { get; set; }
        public decimal? ProdEfficiency { get; set; }
        public decimal? TotalProd { get; set; }
        public decimal? WarpStop { get; set; }
        public decimal? WeftStop { get; set; }
        public string Remarks { get; set; }
        public string OCode { get; set; }
        public string OName { get; set; }
        public int? LoomCode { get; set; }
        public int? SetNo { get; set; }
        public int? SL { get; set; }
        public string Flange { get; set; }
        public string Constraction { get; set; }
        public decimal? WarpCmpx { get; set; }
        public decimal? WeftCmpx { get; set; }
        public decimal? OtherStop { get; set; }
        public DateTime? RunTime { get; set; }
        public int? ShiftCode { get; set; }
        public string UserName { get; set; }
        public DateTime? EDate { get; set; }
        public string GConstraction { get; set; }
        public string FConstraction { get; set; }
        public string Width { get; set; }
        public string Weave { get; set; }
        public string Colour { get; set; }
        public decimal? RunTime1 { get; set; }
        public DateTime? RunTime2 { get; set; }
        public decimal? GaraYarn { get; set; }
        public string LineManName { get; set; }
        public string LineManCode { get; set; }
        public string FitterName { get; set; }
        public string FitterCode { get; set; }
        public string ShortLength { get; set; }
        public int? UCode { get; set; }
        public string UName { get; set; }
        public string SaveStatus { get; set; }
    }
}
