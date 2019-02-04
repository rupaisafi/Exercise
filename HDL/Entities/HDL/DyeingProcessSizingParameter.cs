using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProcessSizingParameter
    {
        public int ID { get; set; }
        public int? SetNo { get; set; }
        public int? SowBoxTemperature { get; set; }
        public int? CookingTemperature { get; set; }
        public int? SqueezePressure1 { get; set; }
        public int? SqueezePressure2 { get; set; }
        public string Remark { get; set; }
        public string EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
