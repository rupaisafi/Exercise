using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public partial class DyeingUtilityRunAndStop
    {
        public int ID { get; set; }
        public int SetNo { get; set; }
        public int? DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public decimal? SlowFromTime { get; set; }
        public decimal? SlowToTime { get; set; }
        public decimal? StopFromTime { get; set; }
        public decimal? StopToTime { get; set; }
        public decimal? Duration { get; set; }
        public int? ReasonID { get; set; }
        public string ReasonName { get; set; }
        public string ReasonType { get; set; }
        public decimal? ProductionLossMeter { get; set; }
        public string CGradeYarnMeter { get; set; }
        public string UserID { get; set; }
        public string TermID { get; set; }
        public DateTime? EntryDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
