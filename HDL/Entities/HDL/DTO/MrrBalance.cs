using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL.DTO
{
    public class MrrBalance
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string IcName{ get; set; }
        public string LCNo { get; set; }
        public decimal LCQnty { get; set; }
        public decimal LCRate { get; set; }
        public decimal LCValue { get; set; }
        public decimal RecQnty { get; set; }
        public decimal RecValue { get; set; }
        public decimal BalQnty { get; set; }
        public decimal BalValue { get; set; }
    
    }
}
