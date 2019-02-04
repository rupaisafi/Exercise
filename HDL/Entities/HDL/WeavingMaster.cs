using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class WeavingMaster
    {
        public int WID { get; set; }
        public DateTime? TrackDate { get; set; }
        public DateTime WeaveDate { get; set; }
        public int? DeptNo { get; set; }
        public string DeptName { get; set; }
        public int? ShiftCode { get; set; }
        public string ShiftName { get; set; }
        public string WorkerShift { get; set; }
        public string UserName { get; set; }
        public DateTime? EntryDate { get; set; }
        public string UnitNo { get; set; }
        public int? UnitCode { get; set; }
        public int? NoOfMC { get; set; }
        public string POName { get; set; }
        public string POCode { get; set; }
        public string CaptainName { get; set; }
        public string CaptainCode { get; set; }
        public string AstSuperName { get; set; }
        public string AstSuperCode { get; set; }
        public string LineManName { get; set; }
        public string LineManCode { get; set; }
        public string MC { get; set; }
        public string LineManName2 { get; set; }
        public string MC2 { get; set; }
        public string BeamFitterName { get; set; }
        public string BeamFitterCode { get; set; }
        public string FitterName { get; set; }
        public string FitterCode { get; set; }
        public int UCode { get; set; }
        public string UName { get; set; }
        public string SaveStatus { get; set; }
    }
}
