using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class InspectionCheckProductionToFinish
    {
        public int ID { get; set; }
        public int DID { get; set; }
        public DateTime? TracDate { get; set; }
        public DateTime SDate { get; set; }
        public string SMonth { get; set; }
        public int? UCode { get; set; }
        public string UName { get; set; }
        public int? CProd { get; set; }
        public int? TotalDays { get; set; }
        public decimal? AvgProd { get; set; }
        public int? StyleCode { get; set; }
        public string StyleNo { get; set; }
        public decimal? Weight { get; set; }
        public string Constraction { get; set; }
        public string Weave { get; set; }
        public string Colour { get; set; }
        public string Width { get; set; }
        public int? QCode { get; set; }
        public string FabQuality { get; set; }
        public int? Prod { get; set; }
        public decimal ProdB { get; set; }
        public decimal ProdC { get; set; }
        public decimal CutPieece { get; set; }
        public decimal Wastage { get; set; }
        public decimal TotalProd { get; set; }
        public decimal FabReturn { get; set; }
        public string Remarks { get; set; }
        public int? CCode { get; set; }
        public string CName { get; set; }
        public int? TotalRoll { get; set; }
        public int? TotalPoint { get; set; }
        public int SetNo { get; set; }
        public int? SS { get; set; }
        public string Loom { get; set; }
        public string Beam { get; set; }
        public int? FCode { get; set; }
        public string FType { get; set; }
        public string PType { get; set; }
        public int? PCode { get; set; }
        public int? FinishMCCode { get; set; }
        public string FinishMCName { get; set; }
    }
}
