using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class KnottingDetail
    {
        [Required]
        public int KID { get; set; }
        public int ID { get; set; }
        public DateTime KDate { get; set; }
        [StringLength(50)]
        public string Loom { get; set; }
        public int SetNo { get; set; }
        public int SSNo { get; set; }
        [StringLength(50)]
        public string BeamNo { get; set; }
        [StringLength(50)]
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public decimal Wastage { get; set; }
        [StringLength(50)]
        public string PO { get; set; }
        [StringLength(50)]
        public string Sizer { get; set; }
        [StringLength(50)]
        public string Captain { get; set; }
        [StringLength(50)]
        public string WarpCount { get; set; }
        [StringLength(50)]
        public string SuppLot { get; set; }
        [StringLength(50)]
        public string Remarks { get; set; }
        [StringLength(10)]
        public string Fault { get; set; }
        public int UCode { get; set; }
        [StringLength(50)]
        public string UName { get; set; }

        /// <summary>
        /// User-Defined Properties
        /// </summary>
        public string SaveStatus { get; set; }
    }
}
