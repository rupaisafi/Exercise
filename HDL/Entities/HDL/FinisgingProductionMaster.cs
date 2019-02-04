using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
   public class FinisgingProductionMaster
    {
        public int FID { get; set; }
        public DateTime FDate { get; set; }
        public string ShiftCode { get; set; }
        public string Shift { get; set; }
        public string Remarks { get; set; }
        public string UserName { get; set; }
        public decimal MCRunTime { get; set; }
        public decimal MCOffTime { get; set; }
        public string MCName { get; set; }
        public string MCCode { get; set; }
        public string PType { get; set; }
        public string PCode { get; set; }
        public string DCode { get; set; }
        public string DName { get; set; }
        public string UCode { get; set; }
        public string UName { get; set; }
    }
}
