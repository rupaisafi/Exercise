using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblEmployeeCaptain
    {
        [Key]
        public int CID { get; set; }

        [StringLength(50)]
        public string CaptainName { get; set; }

        [StringLength(50)]
        public string CaptainCode { get; set; }

        [StringLength(50)]
        public string DeptCode { get; set; }

        [StringLength(50)]
        public string DeptName { get; set; }

        [StringLength(50)]
        public string JoinDate { get; set; }

        [StringLength(50)]
        public string OutDate { get; set; }

        [StringLength(50)]
        public string Remarks { get; set; }

        //[Column(TypeName = "smalldatetime")]
        public DateTime? EDate { get; set; }

        [StringLength(50)]
        public string User { get; set; }

        //[Column(TypeName = "money")]
        public decimal? Marks { get; set; }

        public int? UCode { get; set; }

        [StringLength(50)]
        public string UName { get; set; }
    }
}
