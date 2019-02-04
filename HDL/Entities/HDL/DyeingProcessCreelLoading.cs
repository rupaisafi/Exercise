using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProcessCreelLoading
    {
        public int ID { get; set; }
        public int? SetNo { get; set; }
        public string UpperCreel { get; set; }
        public int? UpperCreelBeamNo { get; set; }
        public string UpperCreelYarnCount { get; set; }
        public string LowerCreel { get; set; }
        public int? LowerCreelBeamNo { get; set; }
        public string LowerCreelYarnCount { get; set; }
        public string Remark { get; set; }
        public string EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
