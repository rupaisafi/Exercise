using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class InspRejectionMaster
    {
        public int ID { get; set; }
        public string SDate { get; set; }
        public int UCode { get; set; }
        public string UName { get; set; }
        public decimal TotalProd { get; set; }
        public string UserName { get; set; }
        public int InsFloorCode { get; set; }
        public string InsFloorName { get; set; }

    }
}
