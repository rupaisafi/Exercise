using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class FinishingStockRec
    {
        public int FIID { get; set; }
        public int FID { get; set; }
        public string SetNo { get; set; }
        public string SSNo { get; set; }
        public string Loom { get; set; }
        public string StyleNo { get; set; }
        public string StyleCode { get; set; }
        public decimal RecQnty { get; set; }
        public string Remarks { get; set; }
    }
}
