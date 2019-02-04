using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class KnottingMaster
    {
        [Required]
        public int ID { get; set; }
        public int UCode { get; set; }
        [StringLength(50)]
        public string UName { get; set; }
        public DateTime KDate { get; set; }
        [StringLength(50)]
        public string Type { get; set; }
        public int TCode { get; set; }
        [StringLength(200)]
        public string Remarks { get; set; }
        public DateTime? TrackDate { get; set; }

        /// <summary>
        /// User-Defined Properties
        /// </summary>
        public int DetailID { get; set; }
        public string SaveStatus { get; set; }

    }
}
