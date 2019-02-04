using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class StickyEnds
    {
        public int SID { get; set; }
        [Required, DataType(DataType.DateTime)]
        public DateTime? SDate { get; set; }
        public int DCode { get; set; }
        public string DName { get; set; }
        public int? UCode { get; set; }
        public string UName { get; set; }
        public string Remarks { get; set; }
        public string SaveStatus { get; set; }
        public DateTime? TrackDate { get; set; }
    }
}
