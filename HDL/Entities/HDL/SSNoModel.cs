using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class SSNoModel
    {
        public int SetNo { get; set; }
        public int ShiftCode { get; set; }
        public string Shift { get; set; }
        public int SSNo { get; set; }
        public string BeamNo { get; set; }
        public decimal LengthMtr { get; set; }
        public string PO { get; set; }
        public string Sizer { get; set; }
        public string DO { get; set; }
        public string CaptainName { get; set; }
    }
}
