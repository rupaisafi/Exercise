using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingYarn
    {
        public int DID { get; set; }
        public DateTime? TracDate { get; set; }
        public DateTime? DyeDate { get; set; }
        public string PType { get; set; }
        public int? PTCode { get; set; }
        public string MCNo { get; set; }
        public int? MCCode { get; set; }
        public int? UCode { get; set; }
        public string UName { get; set; }
        public string Remarks { get; set; }
        public string UserName { get; set; }
        public DateTime? EDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
