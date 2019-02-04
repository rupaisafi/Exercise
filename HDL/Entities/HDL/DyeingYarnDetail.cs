using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingYarnDetail
    {
        public int DIID { get; set; }
        public int? DID { get; set; }
        public int? SetNo { get; set; }
        public DateTime PDate { get; set; }
        public int? BeamNo { get; set; }
        public string YName { get; set; }
        public int? YCode { get; set; }
        public decimal? YCount { get; set; }
        public int? BeamLength { get; set; }
        public decimal? BeamWeight { get; set; }
        public int? EndsBeam { get; set; }
        public int? ProdCone { get; set; }
        public string ShiftName { get; set; }
        public int? ShiftCode { get; set; }
        public int? MPM { get; set; }
        public decimal? Tension { get; set; }
        public string OPName { get; set; }
        public int? OPCode { get; set; }
        public string PackingManName { get; set; }
        public int? PackingManCode { get; set; }
        public decimal? STime { get; set; }
        public decimal? FTime { get; set; }
        public decimal? TTime { get; set; }
        public int? Breakge { get; set; }
        public decimal? BreakgePoint { get; set; }
        public int? LooseEnds { get; set; }
        public int? Crossing { get; set; }
        public int? Lapper { get; set; }
        public int? Knotting { get; set; }
        public string Remarks { get; set; }
        public DateTime? EDate { get; set; }
        public string UserName { get; set; }
        public string SaveStatus { get; set; }
    }
}
