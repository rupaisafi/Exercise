using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingInformation
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public int ColorId { get; set; }
        public decimal ShadeIndigo { get; set; }
        public decimal ShadeBlack { get; set; }
        public decimal BeemSpace { get; set; }
        public decimal BeemLength { get; set; }
        public string RefStd { get; set; }
        public string Csv { get; set; }
        public string Texture { get; set; }

        public string ColorName { get; set; }
    }
}
