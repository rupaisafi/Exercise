using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
   public class FinishingStockMaster
    {
        public int FID { get; set; }
        public DateTime FDate { get; set; }
        public string Remarks { get; set; }
        public decimal Stock { get; set; }
    }
}
