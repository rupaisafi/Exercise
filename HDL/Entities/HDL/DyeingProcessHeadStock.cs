using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProcessHeadStock
    {
        public int ID { get; set; }
        public int? SetNo { get; set; }
        public int? DividingTableTension { get; set; }
        public int? WindingTension { get; set; }
        public int? PressingTension { get; set; }
        public int? Moisture { get; set; }
        public string Remark { get; set; }
        public string EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
