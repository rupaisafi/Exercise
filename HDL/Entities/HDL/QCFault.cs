using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class QCFault
    {
        [Required]
        public int QID { get; set; }
        public int FaultCode { get; set; }
        [StringLength(50)]
        public string FaultName { get; set; }
        [StringLength(50)]
        public string Unit { get; set; }
        [StringLength(50)]
        public string Remarks { get; set; }
        [StringLength(50)]
        public string Status { get; set; }
    }
}
