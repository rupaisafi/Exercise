using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public partial class tblDyeingInformation
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string DyInformation { get; set; }

        [StringLength(50)]
        public string DyInformationType { get; set; }

        [StringLength(50)]
        public string Remarks { get; set; }

        public int? DCode { get; set; }

        [StringLength(50)]
        public string DName { get; set; }

        public int? FCode { get; set; }

        [StringLength(50)]
        public string Falt { get; set; }

        [StringLength(50)]
        public string MajorFalt { get; set; }

        public int? StdYds { get; set; }

        //[Column(TypeName = "money")]
        public decimal? StdPercent { get; set; }

        public int? CheTastCode { get; set; }

        [StringLength(50)]
        public string CheTastType { get; set; }

        public int? CheGroupCode { get; set; }

        [StringLength(50)]
        public string CheGroup { get; set; }

        [StringLength(50)]
        public string PartialNo { get; set; }

        //[Column(TypeName = "money")]
        public decimal? DStdPercent { get; set; }
    }
}
