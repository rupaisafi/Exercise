using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class WarpingInforamtion
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public string YarnCode { get; set; }
        public string YarnLot { get; set; }
        public decimal Qnty { get; set; }
        public decimal Rate { get; set; }
        public string BeemNo { get; set; }
        public string Creel { get; set; }
        public string Ends { get; set; }

        public string YarnName { get; set; }
    }
}
