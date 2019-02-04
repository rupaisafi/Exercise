using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class InspectionFloorStockDetail
    {
        public int DID { get; set; }
        public int ID { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public decimal Qnty { get; set; }
        public string Remarks { get; set; }

    }
}
