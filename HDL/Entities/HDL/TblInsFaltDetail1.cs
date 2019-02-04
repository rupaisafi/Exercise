using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblInsFaltDetail1
    {
        //[Key]
        public int DID { get; set; }

        public int? ID { get; set; }

        public int? StyleCode { get; set; }

        [StringLength(30)]
        public string StyleNo { get; set; }

        //[Column(TypeName = "money")]
        public decimal? Weight { get; set; }

        [StringLength(50)]
        public string Constraction { get; set; }

        [StringLength(50)]
        public string Weave { get; set; }

        [StringLength(50)]
        public string Colour { get; set; }

        [StringLength(50)]
        public string Width { get; set; }

        public int? Prod { get; set; }

        [StringLength(40)]
        public string Remarks { get; set; }

        public int? CCode { get; set; }

        [StringLength(50)]
        public string CName { get; set; }

        public int? TotalRoll { get; set; }

        public int? TotalPoint { get; set; }

        public int? SetNo { get; set; }

        public int? SS { get; set; }

        [StringLength(10)]
        public string Loom { get; set; }

        [StringLength(10)]
        public string Beam { get; set; }

        //[Column(TypeName = "money")]
        public decimal? ProdB { get; set; }

        //[Column(TypeName = "money")]
        public decimal? ProdC { get; set; }

        //[Column(TypeName = "money")]
        public decimal? CutPieece { get; set; }

        //[Column(TypeName = "money")]
        public decimal? Wastage { get; set; }

        //[Column(TypeName = "money")]
        public decimal? ProdG { get; set; }

        //[Column(TypeName = "money")]
        public decimal? TotalProd { get; set; }

        public int? FCode { get; set; }

        [StringLength(50)]
        public string FType { get; set; }

        public int? DCode { get; set; }

        [StringLength(50)]
        public string DName { get; set; }

        [StringLength(200)]
        public string OName { get; set; }

        [StringLength(50)]
        public string OCode { get; set; }

        [StringLength(200)]
        public string POName { get; set; }

        [StringLength(50)]
        public string POCode { get; set; }

        [StringLength(50)]
        public string SzCode { get; set; }

        [StringLength(150)]
        public string SzName { get; set; }

        [StringLength(150)]
        public string CaptainName { get; set; }

        [StringLength(150)]
        public string CaptainCode { get; set; }

        //[Column(TypeName = "smalldatetime")]
        public DateTime? WeavDate { get; set; }

        public int? ShiftCode { get; set; }

        [StringLength(50)]
        public string ShiftName { get; set; }

        [StringLength(50)]
        public string UserName { get; set; }

        //[Column(TypeName = "smalldatetime")]
        public DateTime? EDate { get; set; }

        [StringLength(200)]
        public string LineManName { get; set; }

        [StringLength(50)]
        public string LineManCode { get; set; }

        [StringLength(200)]
        public string SuperVisorName { get; set; }

        [StringLength(50)]
        public string SuperVisorCode { get; set; }

        [StringLength(150)]
        public string FitterName { get; set; }

        [StringLength(150)]
        public string FitterCode { get; set; }

        public int? OPNo { get; set; }

        //[Column(TypeName = "money")]
        public decimal? WarpTotalQnty { get; set; }

        [StringLength(150)]
        public string InFitterName { get; set; }

        [StringLength(150)]
        public string InFitterCode { get; set; }

        public DateTime? FinishDate { get; set; }

        [StringLength(50)]
        public string ChqDName { get; set; }

        public int? ChqDCode { get; set; }
    }
}
