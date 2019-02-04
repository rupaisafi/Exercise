using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingUtilityTimeUtilization
    {
        public int ID { get; set; }
        public int? SetNo { get; set; }
        public string TimeUtilizationID { get; set; }
        public string TimeUtilizationName { get; set; }
        public string MCRunFrom { get; set; }
        public string MCRunTo { get; set; }
        public decimal? TotalTimeHour { get; set; }
        public decimal? CalculatedRunHour { get; set; }
        public string Remark { get; set; }
        public string UserID { get; set; }
        public string TermID { get; set; }
        public DateTime? EntryDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
