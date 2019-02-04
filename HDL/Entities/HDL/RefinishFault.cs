using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class RefinishFault
    {
        public int RID { get; set; }
        public int FCode { get; set; }
        public string FName { get; set; }
        public string DCode { get; set; }
        public string DName { get; set; }
        public string Remarks { get; set; }
    }
}
