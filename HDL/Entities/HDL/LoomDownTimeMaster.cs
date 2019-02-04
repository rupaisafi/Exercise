using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class LoomDownTimeMaster
    {
        public int ID { get; set; }
        public DateTime LoomDate { get; set; }
        public string Remark { get; set; }
        public bool IsDeleted { get; set; }
        public int EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public int UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
