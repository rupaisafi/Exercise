using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingUtilityDrainageDetail
    {
        public int ID { get; set; }
        public int? SetNo { get; set; }        
        public int? ItemID { get; set; }
        public string ItemName { get; set; }
        public decimal? QuantityLiter { get; set; }
        public decimal? Concentration { get; set; }
        public decimal? QuantityKg { get; set; }        
        public int? ShiftCode { get; set; }
        public string ShiftName { get; set; }
        public string PO { get; set; }
        public string CardNo { get; set; }
        public decimal? Cost { get; set; }
        public decimal? Rate { get; set; }
        public int? ReasonID { get; set; }
        public string ReasonName { get; set; }
        public string Remark { get; set; }
        public string EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
