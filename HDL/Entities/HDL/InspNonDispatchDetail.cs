using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
   public class InspNonDispatchDetail
    {
        public int NIID { get; set; }
        public int NID { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public string SetNo { get; set; }
        public int RollNo { get; set; }
        public decimal Qnty { get; set; }
        public string FaultName { get; set; }
        public int FaultCode { get; set; }
        public string DName { get; set; }
        public int DCode { get; set; }
        public string Type { get; set; }
        public string POName { get; set; }
        public string OPName { get; set; }
        public string FMCName { get; set; }
        public int FMCCode { get; set; }
        public string Remarks { get; set; }
    }
}
