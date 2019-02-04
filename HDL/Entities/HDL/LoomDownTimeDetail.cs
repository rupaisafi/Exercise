using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class LoomDownTimeDetail
    {
        
        public int ID { get; set; }
        public int MasterID { get; set; }
        public int LoomID { get; set; }
        public string LoomName { get; set; }
        public int ReasonID { get; set; }
        public string ReasonType { get; set; }
        public string StopTime { get; set; }
        public string RunTime { get; set; }
        public string TotalTime { get; set; }
        public string Remark { get; set; }
        public bool IsDeleted { get; set; }
        public int EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public int UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
