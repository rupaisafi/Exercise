using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblInsFalt
    {
        public int ID { get; set; }

        //[Column(TypeName = "smalldatetime")]
        public DateTime SDate { get; set; }

        public int? UCode { get; set; }

        [StringLength(50)]
        public string UName { get; set; }

        [StringLength(10)]
        public string Ref { get; set; }

        public int? TotalProd { get; set; }

        public int? Rejection { get; set; }

        public int? CutPice { get; set; }

        public int? DID { get; set; }

        //[Column(TypeName = "smalldatetime")]
        public DateTime? TracDate { get; set; }

        [StringLength(50)]
        public string UserName { get; set; }

        //[Column(TypeName = "smalldatetime")]
        public DateTime? EDate { get; set; }

        public int? InsFloorCode { get; set; }

        [StringLength(50)]
        public string InsFloorName { get; set; }

        public string SaveStatus { get; set; }
    }
}
