using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class CausticRecovery
    {
        public int CID { get; set; }
        public DateTime CDate { get; set; }
        public int DCode { get; set; }
        public string DName { get; set; }
        public decimal WeaklyCusticInM3 { get; set; }
        public decimal WeaklyCusticBoom { get; set; }
        public decimal RecoveryCausticM3 { get; set; }
        public decimal RecoveryCausticBoom { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
    }
}
