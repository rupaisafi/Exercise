using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProcessDyeingParameter
    {
        public int ID { get; set; }
        public int? SetNo { get; set; }
        public int? BathNo { get; set; }
        public string BathInProcess { get; set; }
        public int? Temperature { get; set; }
        public int? SqueezePressure { get; set; }
        public int? Tension { get; set; }
        public int? WaterFlow { get; set; }
        public string Remark { get; set; }
        public string EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
